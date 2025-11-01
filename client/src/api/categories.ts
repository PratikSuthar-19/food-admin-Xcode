import api from "./apiClient";

export interface Category { _id?: string; name: string; description?: string; }

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories");
  console.log(data);
  return data.data ;
};

export const createCategory = async (payload: Category) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

export const updateCategory = async (id: string, payload: Partial<Category>) => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
