import { useEffect, useRef, useState } from "react";
import { getCategories, deleteCategory } from "../../api/categories";
import type { Category } from "../../api/categories";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function CategoryTable() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 10;

 // 🟢 Fetch categories (no pagination)
const fetchCategories = async () => {
  setLoading(true);
  try {
    const res = await getCategories();

    // If API directly returns array:
    const data: Category[] = Array.isArray(res)
      ? res
      : (res as Category[]) ?? [];

    setCategories(data);
  } catch (err) {
    console.error("Error loading categories", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, hasMore]);

//   useEffect(() => {
//     if (page > 1) fetchCategories(page);
//   }, [page]);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (cat: Category) => {
    setSelectedCategory(cat);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory._id!);
      setCategories((prev) =>
        prev.filter((c) => c._id !== selectedCategory._id)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="w-full text-white p-6">
      {/* 🔍 Search + Button */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 w-full sm:w-[300px]"
          />
        </div>
        <Button
          onClick={() => navigate("/categories/create")}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-lg px-4 py-2"
        >
          + Create Category
        </Button>
      </div>

      {/* 🖥️ Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-800 rounded-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-neutral-900 text-gray-400 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-800">
            {filtered.map((cat, idx) => (
              <tr
                key={cat._id}
                className="hover:bg-neutral-900 transition-colors duration-150"
              >
                <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-100">{cat.name}</td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {cat.description || "-"}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() =>
                      navigate(`/categories/edit/${cat._id}`, { state: cat })
                    }
                    className="text-sm px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(cat)}
                    className="text-sm px-3 py-1 rounded-md border border-red-700 text-red-400 hover:bg-red-900/30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="text-center py-4 text-gray-400">Loading...</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No categories found.
          </div>
        )}
      </div>

      {/* 📱 Mobile layout */}
      <div className="md:hidden space-y-3">
        {filtered.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between items-center p-4 border border-gray-800 bg-neutral-950 rounded-lg hover:bg-gray-900 transition"
          >
            <div>
              <h3 className="font-medium text-white">{cat.name}</h3>
              <p className="text-sm text-gray-400">
                {cat.description || "No description"}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button
                onClick={() =>
                  navigate(`/categories/edit/${cat._id}`, { state: cat })
                }
                className="text-xs text-blue-400 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(cat)}
                className="text-xs text-red-400 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔻 Infinite scroll sentinel */}
      <div ref={sentinelRef} />

      {/* ✅ Confirm dialog */}
      {showConfirm && (
        <ConfirmDialog
          title={`Delete "${selectedCategory?.name}"?`}
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
