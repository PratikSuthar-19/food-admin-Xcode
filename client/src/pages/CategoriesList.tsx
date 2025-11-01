import CategoryTable from "../components/ui/CategoryTable";
export default function CategoriesList() {
  return (
    <div className="min-h-screen w-full bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Category Management
          </h1>
        </div>

     
        <CategoryTable />
      </div>
    </div>
  );
}
