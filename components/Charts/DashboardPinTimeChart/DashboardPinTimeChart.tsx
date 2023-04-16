"use client";

import React from "react";
import dynamic from "next/dynamic";
import fa from "apexcharts/dist/locales/fa.json";
import moment from "moment-jalaali";
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

    labels: {
      formatter: function (value, timestamp, opts) {
        return `${new Date(value).getHours().toString()}:${new Date(value)
          .getMinutes()
          .toString()}`;

        // return opts.dateFormatter(new Date(timestamp)).format("dd MMM");
      },
    },
  },
  tooltip: {
    enabled: true,
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const values = w.config.series[seriesIndex].data[dataPointIndex].y;
      let val1 = `${new Date(values[0]).getHours()}:${new Date(
        values[0]
      ).getMinutes()}`;
      let val2 = `${new Date(values[1]).getHours()}:${new Date(
        values[1]
      ).getMinutes()}`;

      return (
        '<div class="arrow_box">' +
        "<span>" +
        `از ساعت ${val1} تا ساعت ${val2}` +
        "</span>" +
        "</div>"
      );
    },
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
