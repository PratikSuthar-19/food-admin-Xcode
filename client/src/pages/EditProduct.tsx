import { useLocation, useParams } from "react-router-dom";
import ProductForm from "../components/ui/ProductForm";

export default function EditProduct() {
  const { state } = useLocation();
  const { product } = state || {};
  const { id } = useParams();
  return <ProductForm mode="edit" initialData={product} productId={id} />;
}
