import { useEffect, useState } from "react";
import { getDashboardChart } from "../api/dashboard";
import { Card } from "../components/ui/Card";
import RecentActivity from "../components/ui/RecentActivity";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [chartType, setChartType] = useState<"revenue" | "orders" | "users" | "products">("revenue");
  const [chartData, setChartData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getDashboardChart();
      setAllData(data);
      setChartData(data.revenueOverTime);
    })();
  }, []);

  console.log(chartData)

  const handleChartChange = (type: typeof chartType) => {
    setChartType(type);
    if (!allData) return;

    const map: Record<string, any[]> = {
      revenue: allData.revenueOverTime,
      orders: allData.ordersOverTime,
      users: allData.usersOverTime,
      products: allData.productsOverTime,
    };

    setChartData(map[type]);
  };

  const chartColor =
    chartType === "revenue"
      ? "#22c55e" 
      : chartType === "orders"
      ? "#f97316" 
      : chartType === "users"
      ? "#3b82f6" 
      : "#a855f7"; 

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-8">Dashboard Overview</h1>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          className={`cursor-pointer text-center border ${
            chartType === "revenue"
              ? "border-green-500 bg-green-500/10"
              : "border-zinc-800 bg-zinc-900"
          }`}
          onClick={() => handleChartChange("revenue")}
        >
          <h2 className="text-sm text-zinc-400 mb-1">Revenue</h2>
          <p className="text-2xl font-bold text-green-400">₹{allData?.revenueOverTime?.at(-1)?.totalRevenue || 0}</p>
        </Card>

        <Card
          className={`cursor-pointer text-center border ${
            chartType === "orders"
              ? "border-orange-500 bg-orange-500/10"
              : "border-zinc-800 bg-zinc-900"
          }`}
          onClick={() => handleChartChange("orders")}
        >
          <h2 className="text-sm text-zinc-400 mb-1">Orders</h2>
          <p className="text-2xl font-bold text-orange-400">{allData?.ordersOverTime?.length || 0}</p>
        </Card>

        <Card
          className={`cursor-pointer text-center border ${
            chartType === "users"
              ? "border-blue-500 bg-blue-500/10"
              : "border-zinc-800 bg-zinc-900"
          }`}
          onClick={() => handleChartChange("users")}
        >
          <h2 className="text-sm text-zinc-400 mb-1">Users</h2>
          < p className="text-2xl font-bold text-blue-500"> {allData?.usersOverTime?.reduce((sum:any, u:any) => sum + (u.newUsers || 0), 0) || 0}
</p>
        </Card>

        <Card
          className={`cursor-pointer text-center border ${
            chartType === "products"
              ? "border-purple-500 bg-purple-500/10"
              : "border-zinc-800 bg-zinc-900"
          }`}
          onClick={() => handleChartChange("products")}
        >
          <h2 className="text-sm text-zinc-400 mb-1">Products</h2>
          <p className="text-2xl font-bold text-purple-400">{allData?.productsOverTime?.at(-1)?.newProducts || 0}</p>
        </Card>
      </div>

      {/* Dynamic Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Over Time
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="#a1a1aa"
              tickFormatter={(val) =>
                new Date(val).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                color: "white",
              }}
              labelFormatter={(val) =>
                new Date(val).toLocaleDateString("en-IN", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Bar
              dataKey={
                chartType === "revenue"
                  ? "totalRevenue"
                  : chartType === "orders"
                  ? "totalOrders"
                  : chartType === "users"
                  ? "newUsers"
                  : "newProducts"
              }
              fill={chartColor}
              radius={[8, 8, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
         <RecentActivity />
      </div>
    </div>
  );
}
