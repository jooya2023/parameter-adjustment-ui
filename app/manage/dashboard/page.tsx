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

  const [planChartData, setPlanChartData] = useState<any[]>([]);

  const [notifications, setNotifications] = useState<
    {
      date: Date;
      message: string;
    }[]
  >([]);

  useEffect(() => {
    if (data?.result && data?.result.length > 0) {
      let notificationTemp: {
        date: Date;
        message: string;
      }[] = [];

      const newData = data?.result[0]?.data?.opt_actions_output || [];
      const aaa: {
        name: string;
        data: {
          x: string;
          y: [number, number];
        }[];
      }[] = [];

      newData.forEach((item) => {
        if (item.furnace !== "") {
          let index = aaa.findIndex((subItem) => subItem.name === item.furnace);
          if (index >= 0) {
            notificationTemp.push({
              date: new Date(new Date(item.start_time).getTime() - 60000),
              message: `تغییر به ${item.furnace} در ۱ دقیقه آینده`,
            });
            aaa[index].data.push({
              x: item.furnace,
              y: [
                new Date(item.start_time).getTime(),
                new Date(item.end_time).getTime(),
              ],
            });
          } else {
            notificationTemp.push({
              date: new Date(new Date(item.start_time).getTime() - 60000),
              message: `تغییر به ${item.furnace} در ۱ دقیقه آینده`,
            });
            aaa.push({
              name: item.furnace,
              data: [
                {
                  x: item.furnace,
                  y: [
                    new Date(item.start_time).getTime(),
                    new Date(item.end_time).getTime(),
                  ],
                },
              ],
            });
          }
        }
      });
      setPlanChartData(aaa);
      notificationTemp = notificationTemp.concat(
        data?.result?.[0]?.data?.opt_shooting_list.map((item) => ({
          date: new Date(new Date(item.start_time).getTime() - 60000),
          message: `از یک دقیقه آینده به مدت ${item.duration} دقیقه شوتینگ باید رخ بدهد`,
        }))
      );
      notificationTemp = notificationTemp.concat(
        data?.result?.[0]?.data?.opt_shooting_list.flatMap((item) =>
          item.data.map((subItem) => ({
            date: new Date(
              new Date(subItem.notification_time).getTime() - 60000
            ),
            message: `تغییر  ${subItem.furnace_1} به ${subItem.furnace_2}`,
          }))
        )
      );

      setNotifications(notificationTemp);
    }
  }, [data]);

  useEffect(() => {
    const checkCurrentDateInArray = () => {
      const now = new Date(); // get the current date

      notifications.forEach((date) => {
        if (
          Math.floor(date.date.getTime() / 1000) ===
          Math.floor(now.getTime() / 1000)
        ) {
          toast(date.message, {
            icon: "⚠️",
            position: "bottom-center",
            duration: 10000,
            className: "w-[900px]",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
    };

    const timeoutId = setInterval(checkCurrentDateInArray, 1000); // set a timeout of 1 second

    return () => clearTimeout(timeoutId); // clear the timeout on unmount
  }, [notifications]);

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
        <DashboardPinTimeChart series={planChartData} />
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
