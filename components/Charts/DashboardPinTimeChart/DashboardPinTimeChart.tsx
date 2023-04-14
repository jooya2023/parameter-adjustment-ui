"use client";

import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import fa from "apexcharts/dist/locales/fa.json";
import toast from "react-hot-toast";
import { Tabs, Tab } from "@mui/material";

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
