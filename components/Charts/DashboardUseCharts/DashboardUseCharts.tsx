"use client";

import React from "react";
import DashboardUsageChart from "./DashboardUsageChart/DashboardUsageChart";

type DashboardUseCharts =
  | {
      dolomite: {
        data: number[];
        name: string;
      }[];
      iron: {
        data: number[];
        name: string;
      }[];
      lime: {
        data: number[];
        name: string;
      }[];
    }
  | undefined;

function DashboardUseCharts({
  chartsData,
}: {
  chartsData: DashboardUseCharts;
}) {
  return (
    <div>
      <DashboardUsageChart
        data={chartsData?.dolomite || []}
        title="نمودار مصرف دولومیت"
      />
      <DashboardUsageChart
        data={chartsData?.lime || []}
        title="نمودار مصرف اهک"
      />
      <DashboardUsageChart
        data={chartsData?.iron || []}
        title="نمودار مصرف آهن"
      />
    </div>
  );
}

export default DashboardUseCharts;
