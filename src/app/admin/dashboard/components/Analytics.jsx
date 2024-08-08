"use client";
import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Analytics = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const repsonse = await get("/api/order");
    setOrders(repsonse?.data?.orders);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="flex gap-5 items-start">
      <div className="flex justify-center shadow-3xl items-center gap-5 rounded-xl md:w-4/12 w-full">
        <div className="px-6 pt-8">
          <div className="mb-5">
            <h4 className="text-lg leading-6 text-blueGray-500 font-medium">
              Current download
            </h4>
            <span className="text-sm text-secondary-200 mt-1">
              Downloaded by operating system
            </span>
          </div>
          <div>
            <ReactApexChart
              type="donut"
              options={{
                chart: {
                  width: 200,
                },
                labels: ["Windows", "MacOS", "Linux"],
                colors: ["#008FFB", "#00E396", "#FEB019"],
                legend: { show: false },
                dataLabels: { enabled: false },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "65%",
                      labels: {
                        show: true,
                        name: {
                          show: true,
                          fontSize: "0.875rem",
                        },
                        value: {
                          show: true,
                          fontSize: "1.2rem",
                        },
                      },
                    },
                  },
                },
              }}
              series={[44, 55, 41]}
            />
          </div>
        </div>
      </div>
      <div className="shadow-3xl px-10 pt-8 items-center gap-5 rounded-xl flex-1">
        <div>
          <h4 className="text-lg leading-6 text-blueGray-500 font-medium">
            Area installed
          </h4>
          <span className="text-sm text-secondary-200 mt-1">
            (+43%) than last year
          </span>
          <div>
            <ReactApexChart
              type="bar"
              options={{
                chart: {
                  width: "100%",
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  position: "top",
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  crosshairs: {
                    fill: {
                      type: "gradient",
                      gradient: {
                        colorFrom: "#F0AE11",
                        colorTo: "#F0AE11",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      },
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                yaxis: {
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    show: false,
                    formatter: function (val) {
                      return val + "%";
                    },
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    dataLabels: {
                      position: "top",
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val + "%";
                  },
                  offsetY: -20,
                  style: {
                    fontSize: "12px",
                    colors: ["#F0AE11"],
                  },
                },
                colors: ["#F0AE11"],
              }}
              series={[
                {
                  name: "Series 1",
                  data: [
                    2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
