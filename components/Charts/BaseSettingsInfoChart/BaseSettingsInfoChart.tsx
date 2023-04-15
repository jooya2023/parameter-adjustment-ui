"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import fa from "apexcharts/dist/locales/fa.json";

function BaseSettingsInfoChart({
  series,
  title = "",
}: {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  title?: string;
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
    },
    title: {
      align: "left",
      text: title,
      offsetX: 100,
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
