import api from "./apiClient";

export interface Product {
  _id?: any,
  name: string;
  categoryId: string;
  price: number;
  status?: string; 
  imageUrl?: string;
}


export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data.data ?? data;
};


export const createProduct = async (payload: Omit<Product, "_id">) => {
  const { data } = await api.post("/products", payload);
  return data;
};

// If uploading image, send FormData and set content-type automatically
// export const createProductWithImage = async (formData: FormData) => {
//   const { data } = await api.post("/products", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

export const createProductWithImage = async (payload: Omit<Product, "_id">) => {
  const { data } = await api.post("/products", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const updateProduct = async (id: string, payload: Partial<Product> | FormData) => {
  const isForm = payload instanceof FormData;
  const { data } = await api.put(`/products/${id}`, payload as any, {
    headers: isForm ? { "Content-Type": "multipart/form-data" } : undefined,
  });
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
