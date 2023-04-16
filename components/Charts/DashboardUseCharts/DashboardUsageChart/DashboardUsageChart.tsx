"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import fa from "apexcharts/dist/locales/fa.json";

const series = [
  {
    name: "Desktops1",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
      return Math.floor(Math.random() * 100);
    }),
  },
  {
    name: "Desktops2",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
      return Math.floor(Math.random() * 100);
    }),
  },
  {
    name: "Desktops3",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
      return Math.floor(Math.random() * 100);
    }),
  },
  {
    name: "Desktops4",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
      return Math.floor(Math.random() * 100);
    }),
  },
];

function DashboardUsageChart({
  title,
  categories,
  series,
}: {
  title: string;
  categories: string[];
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
}) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      locales: [fa],
      defaultLocale: "fa",
      width: "100%",
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [0, 0, 0],
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title,
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="400px"
      />
    </div>
  );
}

export default DashboardUsageChart;
