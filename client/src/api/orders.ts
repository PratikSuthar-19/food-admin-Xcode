import api from "./apiClient";

export interface OrderProduct {
  _id: string;
  name: string;
  price: number;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}

export interface OrderItem {
  productId: string | OrderProduct; 
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  userId: string | OrderUser; 
  items: OrderItem[];
  totalAmount?: number;
  orderDate?: string;
}

export type CreateOrderPayload = {
  userId: string; 
  items: {
    productId: string; 
    quantity: number;
    price: number;
  }[];
  totalAmount?: number;
};
// export interface OrderItem { productId: string; quantity: number; price: number; }
// export interface Order { _id?: string; userId: string; items: OrderItem[]; totalAmount?: number; orderDate?: string; }

export const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data.data ?? data;
};
