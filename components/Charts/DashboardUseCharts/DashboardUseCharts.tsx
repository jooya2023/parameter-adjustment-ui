"use client";

import React from "react";
import DashboardUsageChart from "./DashboardUsageChart/DashboardUsageChart";

function DashboardUseCharts({
  dolomiteSeries,
  limeSeries,
  ironSeries,
  usageTimes,
}: {
  dolomiteSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  limeSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  ironSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  usageTimes: string[];
}) {
  return (
    <div>
      <DashboardUsageChart
        series={dolomiteSeries}
        title="نمودار مصرف دولومیت"
        categories={usageTimes}
      />
      <DashboardUsageChart
        series={limeSeries}
        title="نمودار مصرف اهک"
        categories={usageTimes}
      />
      <DashboardUsageChart
        series={ironSeries}
        title="نمودار مصرف آهن"
        categories={usageTimes}
      />
    </div>
  );
}

export default DashboardUseCharts;
