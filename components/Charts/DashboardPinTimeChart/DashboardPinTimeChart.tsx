"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexCharts.ApexOptions = {
  chart: {
    // locales: [fa],
    // defaultLocale: "fa",
    type: "rangeBar",
    width: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "100%",
      rangeBarGroupRows: true,
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

function DashboardPinTimeChart({ series }: { series: any[] }) {
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
