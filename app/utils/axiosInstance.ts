import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create();

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = "http://localhost:8000/api";

type headers = {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
};

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as headers & HeadersDefaults & any;

// Adding Authorization header for all requests

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      // Configure this as per your backend requirements
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axios.post("/token/refresh", {
            headers: {
              Authorization: localStorage.getItem("refresh-token")!,
            },
          });

          const access = rs.data.data["X-Auth-Token"];
          const refresh = rs.data.data["X-Refresh-Token"];

          localStorage.setItem("access-token", access);
          localStorage.setItem("refresh-token", refresh);

          return axiosClient(originalConfig);
        } catch (_error) {
          console.log("Session time out. Please login again.", {
            id: "sessionTimeOut",
          });
          // Logging out the user by removing all the tokens from local
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          // Redirecting the user to the landing page
          window.location.href = window.location.origin;
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
