import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { createCategory, updateCategory} from "../../api/categories";
import type{ Category } from "../../api/categories";
import { useNavigate } from "react-router-dom";

interface CategoryFormProps {
  mode?: "create" | "edit";
  initialData?: Category;
  categoryId?: string;
}

export default function CategoryForm({
  mode = "create",
  initialData,
  categoryId,
}: CategoryFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "edit" && categoryId) {
        await updateCategory(categoryId, formData);
        setMessage("Category updated successfully!");
      } else {
        await createCategory(formData);
        setMessage("Category created successfully!");
        setFormData({ name: "", description: "" });
      }
      setTimeout(() => navigate("/categories"), 1000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-neutral-950 text-white shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6">
        {mode === "edit" ? "Edit Category" : "Create Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Category"
            : "Create Category"}
        </Button>
      </form>

      {message && (
        <p
          className={`text-center text-sm mt-4 ${
            message.includes("Error") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
