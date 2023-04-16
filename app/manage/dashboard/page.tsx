"use client";

import { Tabs, Tab, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardPinTimeChart from "@/components/Charts/DashboardPinTimeChart/DashboardPinTimeChart";
import DashboardUsageChart from "@/components/Charts/DashboardUsageChart/DashboardUsageChart";
import { GetParametersResult } from "@/app/apiManager/ParameterSetting";
import { FormatToPersianDate } from "@/hooks/useFormatToPersianDate";
import { toast } from "react-hot-toast";

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

  const [usageTimes, setUsageTimes] = useState<any[]>([]);
  const [dolomiteSeries, setDolomiteSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([]);
  const [limeSeries, setLimeSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([]);
  const [ironSeries, setIronSeries] = useState<
    ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
  >([]);

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

      const times = data?.result[0].data.opt_w_in_time.time.map((item) => {
        return FormatToPersianDate(item, "hh:mm");
      });
      const filteredTimes = times.filter((time, index) => {
        if (index % 2 === 0) {
          return true;
        }
        return false;
      });
      setUsageTimes(filteredTimes);

      const dolomiteData = data?.result[0].data.opt_w_in_time.data.dolomite.map(
        (item) => {
          return {
            name: item.name,
            data: item.data.filter((dataItem, index) => {
              if (index % 2 === 0) {
                return true;
              }
              return false;
            }),
          };
        }
      );
      setDolomiteSeries(dolomiteData);
      const limeData = data?.result[0].data.opt_w_in_time.data.lime.map(
        (item) => {
          return {
            name: item.name,
            data: item.data.filter((dataItem, index) => {
              if (index % 2 === 0) {
                return true;
              }
              return false;
            }),
          };
        }
      );
      setLimeSeries(limeData);
      const ironData = data?.result[0].data.opt_w_in_time.data.iron.map(
        (item) => {
          return {
            name: item.name,
            data: item.data.filter((dataItem, index) => {
              if (index % 2 === 0) {
                return true;
              }
              return false;
            }),
          };
        }
      );
      setIronSeries(ironData);

      let aaa: {
        name: string;
        data: {
          x: string;
          y: [number, number];
        }[];
      }[] = [];

      data?.result[0].data.opt_actions_output.forEach((item) => {
        if (item.furnace !== "") {
          let insertFlag = true;
          aaa.forEach((subItem, index) => {
            if (subItem.name === item.furnace) {
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
              insertFlag = false;
            }
          });
          if (insertFlag) {
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

      data?.result[0].data.opt_shooting_list.forEach((item) => {
        notificationTemp.push({
          date: new Date(new Date(item.start_time).getTime() - 60000),
          message: `از یک دقیقه آینده به مدت ${item.duration} دقیقه شوتینگ باید رخ بدهد`,
        });
        item.data.forEach((subItem) => {
          notifications.push({
            date: new Date(
              new Date(subItem.notification_time).getTime() - 60000
            ),
            message: `تغییر  ${subItem.furnace_1} به ${subItem.furnace_2}`,
          });
          console.log(subItem);
        });
      });
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
      </TabPanel>
    </div>
  );
}

export default DashboardPage;
