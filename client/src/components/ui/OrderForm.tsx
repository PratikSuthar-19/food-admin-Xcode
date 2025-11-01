import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { createOrder } from "../../api/orders";
import { getProducts, type Product } from "../../api/products";

export default function OrderForm() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    userId: "",
    items: [{ productId: "", quantity: 1, price: 0 }],
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);


  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, userId: e.target.value });
  };


  const handleItemChange = (
    index: number,
    field: "productId" | "quantity",
    value: string | number
  ) => {
    const updatedItems = [...form.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };


    if (field === "productId") {
      const product = products.find((p) => p._id === value);
      updatedItems[index].price = product ? product.price : 0;
    }

    setForm({ ...form, items: updatedItems });
  };

 
  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { productId: "", quantity: 1, price: 0 }],
    });
  };

 
  const removeItem = (index: number) => {
    const updated = [...form.items];
    updated.splice(index, 1);
    setForm({ ...form, items: updated });
  };

  
  const total = form.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createOrder({
        userId: form.userId,
        items: form.items.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        totalAmount: total,
      });

      navigate("/orders");
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-neutral-950 text-white shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          name="userId"
          placeholder="Enter User ID"
          value={form.userId}
          onChange={handleUserChange}
          required
        />

       
        <div className="space-y-4">
          <label className="text-sm text-gray-400">Order Items</label>

          {form.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-3 border border-gray-700 rounded-md p-3"
            >
            
              <select
                value={item.productId}
                onChange={(e) =>
                  handleItemChange(index, "productId", e.target.value)
                }
                className="flex-1 bg-transparent border border-gray-700 rounded-md px-3 py-2 text-sm text-white"
                required
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option
                    key={p._id}
                    value={p._id}
                    className="bg-black text-white"
                  >
                    {p.name}
                  </option>
                ))}
              </select>

     
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                placeholder="Qty"
                className="w-full sm:w-24"
              />

           
              <Input
                type="number"
                value={item.price}
                readOnly
                placeholder="Price"
                className="w-full sm:w-28 bg-gray-900 cursor-not-allowed"
              />

             
              {form.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <Button
            type="button"
            onClick={addItem}
            // className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700 text-sm"
             className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 transition"
          >
            + Add Item
          </Button>
        </div>

       
        <div className="text-right text-gray-300 text-sm">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 transition"
        >
          {loading ? "Creating..." : "Create Order"}
        </Button>
      </form>
    </div>
  );
}
