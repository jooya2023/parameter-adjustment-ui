import React from "react";
import ReactApexChart from "react-apexcharts";
import fa from "apexcharts/dist/locales/fa.json";

// const series = [
//   {
//     name: "Desktops1",
//     data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
//       return Math.floor(Math.random() * 100);
//     }),
//   },
// ];
const options: ApexCharts.ApexOptions = {
  chart: {
    type: "line",
    locales: [fa],
    defaultLocale: "fa",
    width: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
};
function BaseSettingsInfoChart({
  series,
}: {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
}) {
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="250px"
      />
    </div>
  );
}

export default BaseSettingsInfoChart;
