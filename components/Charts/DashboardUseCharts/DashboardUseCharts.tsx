"use client";

import React from "react";
import DashboardUsageChart from "./DashboardUsageChart/DashboardUsageChart";

function DashboardUseCharts({
  dolomiteSeries,
  limeSeries,
  ironSeries,
}: {
  dolomiteSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  limeSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  ironSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
}) {
  return (
    <div>
      <DashboardUsageChart
        series={dolomiteSeries}
        title="نمودار مصرف دولومیت"
      />
      <DashboardUsageChart series={limeSeries} title="نمودار مصرف اهک" />
      <DashboardUsageChart series={ironSeries} title="نمودار مصرف آهن" />
    </div>
  );
}

export default DashboardUseCharts;
