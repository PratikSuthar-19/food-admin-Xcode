import { useEffect, useState } from "react";
import { getProducts, deleteProduct, type Product } from "../../api/products";
import { getCategories, type Category } from "../../api/categories";
import ImageModal from "../ui/ImageModal";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Input } from "../ui/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";


export default function ProductTable() {
    const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        console.error("Error fetching products or categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(products)

  const getCategoryName = (id: string) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Unknown";
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct._id);
      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
      setSelectedProduct(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: Product) => {
  navigate(`/products/edit/${product._id}`, { state: { product } });
};

  return (
    <div className="w-full">
  

      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 w-full sm:w-[300px]"
          />
        </div>
        <Button
          onClick={() => navigate("/products/create")}
          className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-lg px-4 py-2"
        >
          + Create Product
        </Button>
      </div>


      <div className="overflow-x-auto rounded-lg border border-gray-800">
    
        <table className="hidden md:table min-w-full divide-y divide-gray-800">
          <thead className="bg-neutral-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-300">Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">Category</th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">Price</th>
              <th className="px-4 py-3 text-left text-sm text-gray-300">Status</th>
              {/* <th className="px-4 py-3 text-left text-sm text-gray-300">Image</th> */}
              <th className="px-4 py-3 text-left text-sm text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-800">
            {filtered.map((p) => (
              <tr key={p._id} className="hover:bg-gray-900 transition-colors">
                <td className="px-4 py-3 text-gray-100">{p.name}</td>
                <td className="px-4 py-3 text-gray-400">{getCategoryName(p.categoryId)}</td>
                <td className="px-4 py-3 text-gray-400">${p.price}</td>
                <td className="px-4 py-3 text-gray-400 capitalize">
                  {p.status || "N/A"}
                </td>
                {/* <td className="px-4 py-3">
                  {p.imageUrl ? (
                    <button
                      onClick={() => setShowImage(p.imageUrl!)}
                      className="underline text-orange-400 hover:text-orange-300"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-600">No image</span>
                  )}
                </td> */}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <a
                      href={`/products/edit/${p._id}`}
                      className="px-3 py-1 text-sm border border-gray-700 rounded-md hover:bg-gray-800"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDeleteClick(p)}
                      className="px-3 py-1 text-sm border border-red-700 text-red-400 rounded-md hover:bg-red-900/30"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile / Tablet View */}
        <div className="md:hidden divide-y divide-gray-800">
          {filtered.map((p) => (
            <div key={p._id} className="p-4 bg-black hover:bg-gray-900 transition-colors">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-100 font-medium">{p.name}</h3>
                <span className="text-xs text-gray-500 capitalize">{p.status || "N/A"}</span>
              </div>

              <div className="mt-2 text-sm text-gray-400 space-y-1">
                <p>
                  <span className="font-medium text-gray-300">Category:</span>{" "}
                  {getCategoryName(p.categoryId)}
                </p>
                <p>
                  <span className="font-medium text-gray-300">Price:</span> ${p.price}
                </p>
              </div>

              <div className="mt-3 flex justify-between items-center">

                {/* {p.imageUrl ? (
                  <button
                    onClick={() => setShowImage(p.imageUrl!)}
                    className="underline text-orange-400 text-sm hover:text-orange-300"
                  >
                    View Image
                  </button>
                ) : (
                  <span className="text-gray-600 text-sm">No image</span>
                )} */}

                <div className="flex gap-2">
                 <button
                 onClick={() => handleEdit(p)}
                    className="px-3 py-1 text-sm border border-gray-700 rounded-md hover:bg-gray-800"
                  >
                  Edit
              </button>
  
                 
                  <button
                    onClick={() => handleDeleteClick(p)}
                    className="px-3 py-1 text-xs border border-red-700 text-red-400 rounded-md hover:bg-red-900/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-400 mt-3">Loading...</div>
      )}

      {showImage && (
        <ImageModal src={showImage} onClose={() => setShowImage(null)} />
      )}

      {showConfirm && (
        <ConfirmDialog
          title={`Delete "${selectedProduct?.name}"?`}
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
