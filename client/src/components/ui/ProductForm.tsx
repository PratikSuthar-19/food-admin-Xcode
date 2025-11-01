// // src/components/products/ProductForm.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../ui/Input";
// import { Button } from "../ui/Button";
// import {createProductWithImage,
//   updateProduct,
//   type Product,
// } from "../../api/products";
// import { getCategories, type Category } from "../../api/categories";
// import { uploadToCloudinary } from "../../api/upload";

// interface ProductFormProps {
//   mode?: "create" | "edit";
//   initialData?: Product;
//   productId?: string;
// }

// export default function ProductForm({
//   mode = "create",
//   initialData,
//   productId,
// }: ProductFormProps) {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: initialData?.name || "",
//     categoryId: initialData?.categoryId || "",
//     price: initialData?.price?.toString() || "",
//     status: initialData?.status || "available",
//     imageUrl: initialData?.imageUrl || "",
//   });

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       setUploading(true);
//       const url = await uploadToCloudinary(file);
//       setForm((prev) => ({ ...prev, imageUrl: url }));
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed. Check Cloudinary setup.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const productPayload = { ...form, price: Number(form.price) };
//       if (mode === "edit" && productId) {
//         await updateProduct(productId, productPayload);
//       } else {
//         await createProductWithImage(productPayload);
//       }
//       navigate("/products");
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       alert("Failed to save product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-neutral-950 text-white shadow-xl">
//       <h2 className="text-2xl font-semibold text-center mb-6">
//         {mode === "edit" ? "Edit Product" : "Create Product"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <Input
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//         />

//         <div>
//           <label className="text-sm text-gray-400 mb-1 block">Category</label>
//           <select
//             name="categoryId"
//             value={form.categoryId}
//             onChange={handleChange}
//             className="w-full bg-transparent px-3 py-2 text-sm text-white border border-gray-700 rounded-md"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id} className="bg-black text-white">
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-400 mb-1 block">Status</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full bg-transparent px-3 py-2 text-sm text-white border border-gray-700 rounded-md"
//           >
//             <option value="available" className="bg-black">Available</option>
//             <option value="unavailable" className="bg-black">Unavailable</option>
//           </select>
//         </div>


//         <Button
//           type="submit"
//           disabled={loading || uploading}
//           className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 transition"
//         >
//           {loading
//             ? mode === "edit"
//               ? "Updating..."
//               : "Creating..."
//             : mode === "edit"
//             ? "Update Product"
//             : "Create Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { createProduct, updateProduct, type Product } from "../../api/products";
import { getCategories, type Category } from "../../api/categories";

interface ProductFormProps {
  mode?: "create" | "edit";
  initialData?: Product;
  productId?: string;
}

export default function ProductForm({
  mode = "create",
  initialData,
  productId,
}: ProductFormProps) {
  const navigate = useNavigate();

  console.log(initialData)


  const [form, setForm] = useState({
    name: initialData?.name || "",
    categoryId:
      typeof initialData?.categoryId === "object"
        ? (initialData?.categoryId as any)?._id || ""
        : initialData?.categoryId || "",
    price: initialData?.price?.toString() || "",
    status: initialData?.status || "available",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productPayload = {
        ...form,
        price: Number(form.price),
      };

      if (mode === "edit" && productId) {
        await updateProduct(productId, productPayload);
      } else {
        await createProduct(productPayload);
      }

      navigate("/products");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-neutral-950 text-white shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {mode === "edit" ? "Edit Product" : "Create Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
     
        <Input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />


        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

       
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full bg-transparent px-3 py-2 text-sm text-white border border-gray-700 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option
                key={c._id}
                value={c._id}
                className="bg-black text-white"
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-transparent px-3 py-2 text-sm text-white border border-gray-700 rounded-md"
          >
            <option value="available" className="bg-black">
              Available
            </option>
            <option value="unavailable" className="bg-black">
              Unavailable
            </option>
          </select>
        </div>

      
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 transition"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
