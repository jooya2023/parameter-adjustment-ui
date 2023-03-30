"use client";

import { Tabs, Tab, Box, Typography } from "@mui/material";
import React from "react";
import DashboardPinTimeChart from "@/components/Charts/DashboardPinTimeChart/DashboardPinTimeChart";
import DashboardDolomiteUsageChart from "@/components/Charts/DashboardDolomiteUsageChart/DashboardDolomiteUsageChart";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="نمودار زمانبندی شارژ" />
        <Tab label="نمودار مصرف دولومیت" />
        <Tab label="نمودار مصرف آهک" />
        <Tab label="نمودار مصرف آهن" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DashboardPinTimeChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DashboardDolomiteUsageChart />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DashboardDolomiteUsageChart />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DashboardDolomiteUsageChart />
      </TabPanel>
    </div>
  );
}

export default DashboardPage;
