import { useEffect, useState } from "react";
import { getOrders, type Order } from "../../api/orders";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function OrderTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  const filtered = orders.filter((o) => {
    const userIdString =
      typeof o.userId === "string"
        ? o.userId
        : o.userId?.name || o.userId?._id || "";
    return userIdString.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="w-full">
      {/* Search & Create */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Input
          placeholder="Search by User Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 w-full sm:w-[300px]"
        />
        <Button
          onClick={() => navigate("/orders/create")}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-lg px-4 py-2"
        >
          + Create Order
        </Button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="hidden md:table min-w-full divide-y divide-gray-800">
          <thead className="bg-neutral-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-300">
                User
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">
                Items
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">
                Total
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-800">
            {filtered.map((o) => (
              <tr key={o._id} className="hover:bg-gray-900 transition">
                <td className="px-4 py-3 text-gray-100">
                  {typeof o.userId === "object"
                    ? `${o.userId.name} (${o.userId.email})`
                    : o.userId}
                </td>

                <td className="px-4 py-3 text-gray-400">
                  {o.items.map((i, idx) => (
                    <div key={idx}>
                      {typeof i.productId === "object"
                        ? i.productId.name
                        : i.productId}{" "}
                      × {i.quantity} (${i.price})
                    </div>
                  ))}
                </td>

                <td className="px-4 py-3 text-gray-300">
                  ${o.totalAmount ?? "-"}
                </td>

                <td className="px-4 py-3 text-gray-400">
                  {o.orderDate
                    ? new Date(o.orderDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-800">
          {filtered.map((o) => (
            <div
              key={o._id}
              className="p-4 bg-black hover:bg-gray-900 transition"
            >
              <h3 className="text-gray-100 font-medium">
                User:{" "}
                {typeof o.userId === "object"
                  ? o.userId.name
                  : o.userId ?? "Unknown"}
              </h3>

              <div className="mt-2 text-sm text-gray-400 space-y-1">
                {o.items.map((i, idx) => (
                  <p key={idx}>
                    {typeof i.productId === "object"
                      ? i.productId.name
                      : i.productId}{" "}
                    × {i.quantity} (${i.price})
                  </p>
                ))}
                <p>
                  <span className="font-medium text-gray-300">Total:</span> $
                  {o.totalAmount ?? "-"}
                </p>
                <p>
                  <span className="font-medium text-gray-300">Date:</span>{" "}
                  {o.orderDate
                    ? new Date(o.orderDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-400 mt-3">Loading...</div>
      )}
    </div>
  );
}
