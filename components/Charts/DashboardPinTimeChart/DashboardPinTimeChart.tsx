"use client";

import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import fa from "apexcharts/dist/locales/fa.json";
import toast from "react-hot-toast";
import { Tabs, Tab } from "@mui/material";

const series = [
  {
    name: "EAF1_DRI1",
    data: [
      {
        x: "EAF1_DRI1",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI1",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI2",
    data: [
      {
        x: "EAF1_DRI2",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI2",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI2",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI3",
    data: [
      {
        x: "EAF1_DRI3",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI3",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI3",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI4",
    data: [
      {
        x: "EAF1_DRI4",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI4",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI4",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI5",
    data: [
      {
        x: "EAF1_DRI5",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI5",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI5",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI6",
    data: [
      {
        x: "EAF1_DRI6",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI6",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI6",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI7",
    data: [
      {
        x: "EAF1_DRI7",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI7",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI7",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI8",
    data: [
      {
        x: "EAF1_DRI8",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI8",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI8",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
  {
    name: "EAF1_DRI9",
    data: [
      {
        x: "EAF1_DRI9",
        y: [
          new Date("2023-03-29T23:50:45.583Z").getTime(),
          new Date("2023-03-29T23:55:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI9",
        y: [
          new Date("2023-03-29T22:50:45.583Z").getTime(),
          new Date("2023-03-29T23:50:45.583Z").getTime(),
        ],
      },
      {
        x: "EAF1_DRI9",
        y: [
          new Date("2023-03-29T20:50:45.583Z").getTime(),
          new Date("2023-03-29T21:50:45.583Z").getTime(),
        ],
      },
    ],
  },
];

const options: ApexCharts.ApexOptions = {
  chart: {
    locales: [fa],
    defaultLocale: "fa",
    type: "rangeBar",
    width: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "80%",
    },
  },
  xaxis: {
    type: "datetime",
  },
  stroke: {
    width: 1,
  },
  fill: {
    type: "solid",
    opacity: 0.8,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
};

function DashboardPinTimeChart() {
  useEffect(() => {
    const alarmTimeout = setTimeout(() => {
      toast("دریچه شماره ۱۰ کوره شماره ۱۰ را باز کنید.", {
        icon: "⚠️",
        position: "bottom-center",
        duration: 5000,
        className: "w-[900px]",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }, 3000); // 2 minutes in milliseconds

    return () => clearTimeout(alarmTimeout);
  }, []);
  return (
    <div style={{ direction: "ltr" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="rangeBar"
        height="700px"
      />
    </div>
  );
}

export default DashboardPinTimeChart;
