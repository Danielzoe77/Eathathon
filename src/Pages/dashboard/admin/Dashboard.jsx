import React from "react";
import Chart from "react-apexcharts";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useMenu from "../../../hooks/useMenu";
import useAuthUsers from "../../../hooks/useAuthUsers";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useOrders from "../../../hooks/useOrders";

const Dashboard = () => {
  const [menu, categories, , refetch] = useMenu();

  const { allPayments, confirmed, pending, totalPrice, refetchOrders } =
    useOrders();

  const {
    allUsers,
    users,
    admins,
    loading: usersLoading,
    refetchUsers,
  } = useAuthUsers();
  const isLoading = !menu.length || !categories.length || usersLoading;

  if (isLoading) {
    return (
      <LoadingSpinner className="h-screen w-full flex items-center justify-center " />
    );
  }

  const categoryCounts = categories.map((category) => {
    return menu.filter((item) => item.category === category).length;
  });

  const chartRevenueOptions = {
    chart: {
      type: "donut",
    },

    legend: {
      show: false,
      position: "bottom",
    },
    dataLabels: {
      enabled: false, // Removes data labels like percentages
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false, // Removes center label like "50%"
          },
        },
      },
    },
    colors: ["#3b82f6"],
  };

  const chartRevenueSeries = [admins.length, users.length];

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Admin", "Users"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false, // Removes data labels like percentages
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false, // Removes center label like "50%"
          },
        },
      },
    },
    colors: ["#3b82f6", "#10b981"],
  };

  const chartOrdersOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Confirm", "Pending"],
    legend: {
      position: "bottom",
      //add padding
      containerMargin: {
        bottom: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    colors: ["#3b82f6", "#10b981"],
  };

  const chartOrdersSeries = [confirmed.length, pending.length];

  const categoryStats = [
    { category: "Pizza", count: 55 },
    { category: "Burger", count: 45 },
    { category: "Drinks", count: 25 },
    // { category: "Desserts", count: 10 }
  ];

  const seriesData = categoryStats.map(item => item.count);
  const categories1 = categoryStats.map(item => item.category);

  const options = {
    chart: {
      type: 'bar',
      height: 50,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: false,
        barHeight: '30%',
      },
    },
    dataLabels: {
      enabled: false,
      formatter: val => `${val} orders`
    },
    xaxis: {
      categories: categories1,
      // title: {
      //   text: 'Total Orders',
      //   style: { fontWeight: 100 }
      // }
    },
    colors: ['#34d399', '#60a5fa', '#fbbf24', '#f472b6'], // Optional color palette
    title: {
      text: 'Recent Orders',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold'
      }
    }
  };

  const series = [
    {
      data: seriesData
    }
  ];


  const chartMenuSeries = categoryCounts;

  const data = {
    series: [
      {
        name: "Quantity",
        data: categoryCounts,
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
      colors: ["#34d399"],
    },
  };

  const total = [menu.length];

  const chartSeries = [admins.length, users.length]; // Replace with dynamic values as needed

  const pieOptions = {
    chart: {
      type: "pie",
    },
    labels: categories,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false, // Removes data labels like percentages
    },

    colors: [
      "#3b82f6",
      "#10b981",
      "#10b981",
      "#f59e0b",
      "#6366f1",
      "#ef4444",
      "#8b5cf6",
    ],
  };

  const pieSeries = categoryCounts; // 8 confirmed, 6 pending = 14 total

  return (
    <div className="w-full md:w-[1000px] mx-auto px-4">
      <nav className="w-full bg-white shadow-sm py-4 flex items-center justify-between">
        {/* Left: Greeting */}
        <h2 className="text-2xl my-4 font-semibold">
          Hi Daniel <span className="text-green">👋</span>{" "}
        </h2>

        {/* Right: Search and Avatar */}
        <div className="flex items-center gap-4">
          {/* Search input - hidden on small screens */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-40 md:w-64 hidden sm:block"
          />

          {/* Magnifying glass icon - shown only on small screens */}
          <button className="block sm:hidden p-2">
            <FaMagnifyingGlass className="h-6 w-6 text-gray-400" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* the four card section */}
      <div className="grid grid-cols-1 lg:w-[1000px]   md:w-[1000px] ml-[-18px] pl-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {/* Card 1 */}

        <div className=" w-full border rounded-md max-w-sm bg-base-100 shadow-lg">
          <div className=" m-4 p-4">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-base">Revenue</h2>
              <span className="badge border-gray-400 bg-gray-200 badge-outline badge-sm">Today</span>
            </div>
            <hr className="m-4  border-gray-200 w-[100%]" />
            <div className="mb-2 p-0">
              <h1 className="text-3xl font-bold">${totalPrice}</h1>
              <div className="flex items-start mt-2">
                <span className="text-sm text-gray-500">
                  Compared to yesterday ${totalPrice / 4}
                </span>
                <span className="text-error text-sm font-medium">↓1.5%</span>
              </div>
            </div>

            <div className="mt-8 text-sm font-medium text-gray-500">
              Last week income{" "}
              <span className="text-base-content font-semibold">${totalPrice / 2}</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-base-100 text-center border shadow-lg rounded-md w-full">
          <div className="card-body ">
            <h2 className="card-title justify-center">
              All Users: {allUsers.length}
            </h2>
            <div className="flex flex-col md:flex-row justify-center mt-4">
              <div className="w-30 h-30 md:w-40 md:h-40">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="bg-base-100 text-center border shadow-lg rounded-md md:w-[230px] mb-0 w-full">
          <div className="card-body">
            <h2 className="card-title justify-center pb-3">
            All Orders: {allPayments.length}
            </h2>
            <div className="flex flex-col md:flex-row justify-center mt-1">
              <div className="w-30 h-30 md:w-40 md:h-40">
                <Chart
                  options={chartOrdersOptions}
                  series={chartOrdersSeries}
                  type="donut"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* card 4 */}
        <div className="p-4 border  bg-white shadow-lg rounded-md">
      <Chart className="mt-2" options={options} series={series} type="bar" height={250} />
    </div>
      </div>

      {/* the graph and the pie chart */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Bar Chart */}
        <div className="w-full mt-6 border  md:w-1/2">
          <div className="p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out rounded-2xl bg-white">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Food Items Overview
              </h2>
              <p className="text-sm text-gray-500">Total Items: {total}</p>
            </div>
            <div className="p-0">
              <Chart
                options={data.options}
                series={data.series}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full mt-6 border md:w-1/2">
          <Chart
            options={pieOptions}
            className="p-10 mt-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out rounded-2xl bg-white"
            series={pieSeries}
            type="pie"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
