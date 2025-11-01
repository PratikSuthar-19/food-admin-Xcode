import api from "./apiClient";

export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } = await api.get("/dashboard");
  return data.data ?? data;
};

export const getDashboardChart = async (): Promise<any> =>{
 const { data } = await api.get("/dashboard/chart");
  return data.data ?? data;
}

