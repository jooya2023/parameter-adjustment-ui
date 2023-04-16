"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import fa from "apexcharts/dist/locales/fa.json";

type DashboardUsageChartData = {
  data: number[];
  name: string;
};

type DashboardUsageChartProps = {
  title: string;
  data: DashboardUsageChartData[];
};

function DashboardUsageChart({ title, data }: DashboardUsageChartProps) {
  const options: ApexCharts.ApexOptions = useMemo(
    () => ({
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
        tickAmount: 50,
      },
    }),
    [title]
  );

  const chartSeries = useMemo<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >(() => {
    return data.map((item) => {
      return {
        name: item.name,
        data: item.data.filter((dataItem, index) => index % 2 === 0),
      };
    });
  }, [data]);

  return (
    <div>
      <ReactApexChart
        options={options}
        series={chartSeries}
        type="line"
        height="400px"
      />
    </div>
  );
}

export default DashboardUsageChart;
