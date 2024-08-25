"use client";
import { get } from "@/utils/api";
import { AcountType } from "@prisma/client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Analytics = () => {
  const session = useSession();
  const user = session?.data?.user;

  const [orders, setOrders] = useState([]);
  const [series, setSeries] = useState([]);
  const [monthlyOrdersAmounts, setMonthlyOrdersAmounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRolesCounts, setUserRolesCounts] = useState([]);

  const getOrders = async () => {
    const response = await get("/api/order");
    setOrders(response?.data?.orders);
  };

  const getUsers = async () => {
    const response = await get("/api/user");
    setUsers(response?.data?.users);
  };

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  useEffect(() => {
    const monthWiseOrders = Array(12).fill(0);
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();
      monthWiseOrders[monthIndex]++;
    });

    const data = monthWiseOrders.map((count) => count);
    setSeries([{ name: "Orders", data }]);

    const monthlyOrdersAmounts = Array(12).fill(0);
    orders.forEach((order) => {
      if (order.orderItems && order.orderItems.length > 0) {
        order?.orderItems?.forEach((item) => {
          const date = new Date(order.createdAt);
          const monthIndex = date.getMonth();
          monthlyOrdersAmounts[monthIndex] += item.price;
        });
      }
    });

    const amounts = monthlyOrdersAmounts.map((amount) => amount);
    setMonthlyOrdersAmounts([{ name: "Amount", data: amounts }]);
  }, [orders]);

  useEffect(() => {
    const rolesCount = users.reduce(
      (acc, user) => {
        acc[user?.role?.role_name] = (acc[user?.role?.role_name] || 0) + 1;
        return acc;
      },
      Object.keys(AcountType).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {})
    );

    setUserRolesCounts(Object.keys(AcountType).map((key) => rolesCount[key]));
  }, [users]);

  return (
    <>
      <div className="flex gap-5 items-start mb-5">
        <div className="shadow rounded-xl md:w-4/12 w-full border border-[#cfd8dc] bg-[#ffffff]">
          <div className="mb-5">
            <h4 className="text-lg px-6 pt-8 leading-6 text-blueGray-500 font-medium">
              Monthly Order Amount
            </h4>
          </div>
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
                  position: "bottom",
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
                    show: true,
                    formatter: function (val) {
                      return val;
                    },
                  },
                  // tickAmount: 8,
                },
                plotOptions: {
                  bar: {
                    columnWidth: 10,
                    borderRadius: 2,
                    dataLabels: {
                      position: "top",
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                  formatter: function (val) {
                    return val;
                  },
                  offsetY: -20,
                  style: {
                    fontSize: "12px",
                    colors: ["#F0AE11"],
                  },
                },
                grid: {
                  show: true,
                  strokeDashArray: 3,
                  position: "back",
                },
                colors: ["#F0AE11"],
              }}
              series={monthlyOrdersAmounts}
            />
          </div>
        </div>
        <div className="shadow gap-5 rounded-xl md:w-4/12 border border-[#cfd8dc] bg-[#ffffff] ">
          <div className="mb-5">
            <h4 className="text-lg px-6 pt-8 leading-6 text-blueGray-500 font-medium">
              Monthly Orders
            </h4>
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
                    position: "bottom",
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
                      show: true,
                      formatter: function (val) {
                        return val;
                      },
                    },
                    // tickAmount: 8,
                  },
                  plotOptions: {
                    bar: {
                      columnWidth: 10,
                      borderRadius: 2,
                      dataLabels: {
                        position: "top",
                      },
                    },
                  },
                  dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                      return val;
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "12px",
                      colors: ["#F0AE11"],
                    },
                  },
                  grid: {
                    show: true,
                    strokeDashArray: 3,
                    position: "back",
                  },
                  colors: ["#F0AE11"],
                }}
                series={series}
              />
            </div>
          </div>
        </div>
        {user?.roles?.role_name === AcountType.ADMIN && (
          <div className="shadow rounded-xl md:w-4/12 w-full mb-5 border border-[#cfd8dc] bg-[#ffffff]">
            <div className="px-6 pt-8">
              <div className="mb-5">
                <h4 className="text-lg leading-6 text-blueGray-500 font-medium">
                  Total Users
                </h4>
              </div>
            </div>
            <div className="user-donut-chart h-full">
              <ReactApexChart
                type="donut"
                options={{
                  chart: {
                    width: "100%",
                    height: "100%",
                  },
                  labels: Object.keys(AcountType).map((key) => AcountType[key]),
                  colors: ["#F0AE11", "#F7C866", "#B77E0D"],
                  legend: {
                    show: true,
                    position: "bottom",
                    height: 60,
                    itemMargin: {
                      horizontal: 10,
                      vertical: 5,
                    },
                  },
                  dataLabels: { enabled: false },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: 70,
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
                          total: {
                            show: true,
                            formatter: function (w) {
                              return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b;
                              }, 0);
                            },
                          },
                        },
                      },
                    },
                  },
                }}
                series={userRolesCounts}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
