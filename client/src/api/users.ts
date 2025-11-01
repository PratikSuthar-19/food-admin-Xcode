import api from "./apiClient";

export interface User { _id?: string; name: string; email: string; mobile: string; }

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users");
  return data.data ?? data;
};

export const createUser = async (payload: User) => {
  const { data } = await api.post("/users", payload);
  return data;
};

export const updateUser = async (id: string, payload: Partial<User>) => {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
