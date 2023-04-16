"use client";

import { Tabs, Tab, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardPinTimeChart from "@/components/Charts/DashboardPinTimeChart/DashboardPinTimeChart";
import DashboardUsageChart from "@/components/Charts/DashboardUseCharts/DashboardUsageChart/DashboardUsageChart";
import { GetParametersResult } from "@/app/apiManager/ParameterSetting";
import { FormatToPersianDate } from "@/hooks/useFormatToPersianDate";
import { toast } from "react-hot-toast";
import DashboardUseCharts from "@/components/Charts/DashboardUseCharts/DashboardUseCharts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function DashboardPage() {
  const [value, setValue] = React.useState(0);
  const { data, isLoading } = GetParametersResult();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (isLoading) {
    return <Typography>در حال دریافت اطلاعات...</Typography>;
  }
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="نمودار زمانبندی شارژ" />
        <Tab label="نمودار های مصرف" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DashboardPinTimeChart chartData={data?.result[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DashboardUseCharts
          chartsData={data?.result[0]?.data?.opt_w_in_time?.data}
        />
      </TabPanel>
    </div>
  );
}

export default DashboardPage;
