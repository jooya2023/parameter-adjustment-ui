"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import fa from "apexcharts/dist/locales/fa.json";
import moment from "moment-jalaali";
import toast from "react-hot-toast";
import { ParameterCalc } from "@/app/apiManager/ParameterSetting";
import { FormatToPersianDate } from "@/hooks/useFormatToPersianDate";
import { Button, Fab, Tooltip } from "@mui/material";
import { GoMute, GoUnmute } from "react-icons/go";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function DashboardPinTimeChart({
  chartData,
}: {
  chartData: ParameterCalc | undefined;
}) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      // locales: [fa],
      // defaultLocale: "fa",
      type: "rangeBar",
      width: "100%",
      id: "pinTimeChart",
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
      tickAmount: 40,
      labels: {
        datetimeUTC: false,
        formatter: function (value, timestamp, opts) {
          return FormatToPersianDate(value, "HH:mm");
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
  const [planChartData, setPlanChartData] = useState<any[]>([]);

  const [notifications, setNotifications] = useState<
    {
      date: Date;
      message: string;
    }[]
  >([]);

  const [audioEnabled, setAudioEnabled] = useState(false);

  const audioPlayer = useRef<any>(null);
  const chart = useRef<any>(null);

  const playNotificationAudio = useCallback(() => {
    if (audioEnabled) {
      audioPlayer.current.play();
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (chartData) {
      let notificationTemp: {
        date: Date;
        message: string;
      }[] = [];

      const newData = chartData.data?.opt_actions_output || [];
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
        chartData.data?.opt_shooting_list.map((item) => ({
          date: new Date(new Date(item.start_time).getTime() - 60000),
          message: `از یک دقیقه آینده به مدت ${item.duration} دقیقه شوتینگ باید رخ بدهد`,
        }))
      );
      notificationTemp = notificationTemp.concat(
        chartData.data?.opt_shooting_list.flatMap((item) =>
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
  }, [chartData]);

  useEffect(() => {
    const checkCurrentDateInArray = () => {
      const now = new Date(); // get the current date
      ApexCharts.exec("pinTimeChart", "clearAnnotations");
      ApexCharts.exec("pinTimeChart", "addXaxisAnnotation", {
        x: now.getTime(),
        strokeDashArray: 2,
        label: {
          borderColor: "#FF4560",
          style: {
            color: "#fff",
            background: "#FF4560",
          },
          text: "زمان حال",
        },
      });
      notifications.forEach((date) => {
        if (
          Math.floor(date.date.getTime() / 1000) ===
          Math.floor(now.getTime() / 1000)
        ) {
          playNotificationAudio();
          toast(date.message, {
            icon: "⚠️",
            position: "bottom-center",
            duration: 20000,
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

    const timeoutId = setInterval(checkCurrentDateInArray, 1000);

    return () => clearTimeout(timeoutId);
  }, [notifications, audioEnabled]);

  return (
    <div style={{ direction: "ltr" }}>
      <audio ref={audioPlayer} src="/sound/notification-sound.mp3" />

      <Tooltip title={`صدای اعلان ${audioEnabled ? "غیر فعال" : "فعال"} شود.`}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setAudioEnabled(!audioEnabled);
          }}
          size="small"
          sx={{
            position: "fixed",
            right: "10px",
            bottom: "10px",
            zIndex: 100,
          }}
        >
          {audioEnabled ? <GoUnmute /> : <GoMute />}
        </Fab>
      </Tooltip>

      <ReactApexChart
        options={options}
        series={planChartData}
        type="rangeBar"
        height="700px"
      />
    </div>
  );
}

export default DashboardPinTimeChart;
