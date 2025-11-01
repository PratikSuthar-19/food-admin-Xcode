import { useLocation } from "react-router-dom";
import CategoryForm from "../components/ui/CategoryForm";
import type{ Category } from "../api/categories";

export default function EditCategory() {
  const { state } = useLocation();
  const category = state as Category;
  return <CategoryForm mode="edit" initialData={category} categoryId={category._id} />;
}
