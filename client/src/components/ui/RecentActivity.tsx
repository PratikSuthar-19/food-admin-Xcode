import { useEffect, useState } from "react";
import { getUsers } from "../../api/users";
import { getProducts } from "../../api/products";
import { getOrders } from "../../api/orders";
import { getCategories } from "../../api/categories";

export default function RecentActivity() {
  const [data, setData] = useState<any>({
    recentOrders: [],
    recentUsers: [],
    recentProducts: [],
    recentCategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [usersRes, productsRes, ordersRes, categoriesRes] = await Promise.allSettled([
          getUsers(),
          getProducts(),
          getOrders(),
          getCategories(),
        ]);

        const getSafeArray = (res: any) =>
          res.status === "fulfilled" && Array.isArray(res.value) ? res.value : [];

        const users = getSafeArray(usersRes);
        const products = getSafeArray(productsRes);
        const orders = getSafeArray(ordersRes);
        const categories = getSafeArray(categoriesRes);

        const sortByDate = (arr: any[], key: string) =>
          [...arr].sort((a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime()).slice(0, 5);

        const recentUsers = sortByDate(users, "createdAt");
        const recentProducts = sortByDate(products, "createdAt");
        const recentOrders = sortByDate(orders, "orderDate");
        const recentCategories = sortByDate(categories, "createdAt");

        setData({ recentUsers, recentProducts, recentOrders, recentCategories });
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log("data", data)

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-400 text-center">
        Loading recent activity...
      </div>
    );
  }

  const { recentOrders, recentUsers, recentProducts, recentCategories } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
      {/* Orders */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3 text-white">Recent Orders</h2>
        <ul className="space-y-2 text-sm">
          {recentOrders.length ? (
            recentOrders.map((order: any) => (
              <li key={order._id} className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-300">
                <span>{order.user?.name || "Unknown"}</span>
                <span className="text-orange-400 font-medium">₹{order.totalAmount}</span>
              </li>
            ))
          ) : (
            <p className="text-zinc-500 text-center">No orders yet</p>
          )}
        </ul>
      </div>

      {/* Users */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3 text-white"> Recent Users</h2>
        <ul className="space-y-2 text-sm">
          {recentUsers.length ? (
            recentUsers.map((user: any) => (
              <li key={user._id} className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-300">
                <span>{user.name}</span>
                <span className="text-zinc-500">{user.email}</span>
              </li>
            ))
          ) : (
            <p className="text-zinc-500 text-center">No users yet</p>
          )}
        </ul>
      </div>

      {/* Products */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3 text-white"> Recent Products</h2>
        <ul className="space-y-2 text-sm">
          {recentProducts.length ? (
            recentProducts.map((product: any) => (
              <li key={product._id} className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-300">
                <span>{product.name}</span>
                <span className="text-purple-400 font-medium">₹{product.price}</span>
              </li>
            ))
          ) : (
            <p className="text-zinc-500 text-center">No products yet</p>
          )}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-3 text-white"> Recent Categories</h2>
        <ul className="space-y-2 text-sm">
          {recentCategories.length ? (
            recentCategories.map((cat: any) => (
              <li key={cat._id} className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-300">
                <span>{cat.name}</span>
                <span className="text-zinc-500">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <p className="text-zinc-500 text-center">No categories yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}
