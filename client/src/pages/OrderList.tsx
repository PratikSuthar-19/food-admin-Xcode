import OrderTable from "../components/ui/OrderTable";

export default function OrderList() {
  return (
    <div className="min-h-screen w-full bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
   
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Order Management
          </h1>
        </div>

   
        <OrderTable />
      </div>
    </div>
  );
}