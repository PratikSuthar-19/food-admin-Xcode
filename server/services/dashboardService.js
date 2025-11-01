import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getDashboardSummary = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const agg = await Order.aggregate([{ $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }]);
  const totalRevenue = (agg[0] && agg[0].totalRevenue) || 0;
  return { totalUsers, totalProducts, totalOrders, totalRevenue };
};

export const getDashboardChartData = async () => {
  const today = new Date();
  const pastWeek = new Date();
  pastWeek.setDate(today.getDate() - 6);

  // 🧠 Helper: fill missing days
  const fillMissingDays = (data, field) => {
    const map = new Map(data.map((d) => [d.date, d[field]]));
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      result.push({ date: dateStr, [field]: map.get(dateStr) || 0 });
    }
    return result;
  };

  // 1️⃣ Revenue Over Time
  const revenueOverTime = await Order.aggregate([
    { $match: { orderDate: { $gte: pastWeek } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: "$_id", totalRevenue: 1 } },
  ]);

  // 2️⃣ Orders Over Time
  const ordersOverTime = await Order.aggregate([
    { $match: { orderDate: { $gte: pastWeek } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: "$_id", totalOrders: 1 } },
  ]);

  // 3️⃣ Users Over Time
  const usersOverTime = await User.aggregate([
    { $match: { createdAt: { $gte: pastWeek } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        newUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: "$_id", newUsers: 1 } },
  ]);

  // 4️⃣ Products Over Time
  const productsOverTime = await Product.aggregate([
    { $match: { createdAt: { $gte: pastWeek } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        newProducts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: "$_id", newProducts: 1 } },
  ]);

  return {
    revenueOverTime: fillMissingDays(revenueOverTime, "totalRevenue"),
    ordersOverTime: fillMissingDays(ordersOverTime, "totalOrders"),
    usersOverTime: fillMissingDays(usersOverTime, "newUsers"),
    productsOverTime: fillMissingDays(productsOverTime, "newProducts"),
  };
};
