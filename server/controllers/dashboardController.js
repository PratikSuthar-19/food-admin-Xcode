import * as dashboardService from '../services/dashboardService.js';

export const getDashboard = async (req, res, next) => {
  try {
    const summary = await dashboardService.getDashboardSummary();
    res.json({ success: true, data: summary });
  } catch (err) { next(err); }
};

export const getDashboardChart = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardChartData();
    res.json(data);
  } catch (error) {
    console.error("Dashboard chart error:", error);
    res.status(500).json({ message: "Error generating chart data" });
  }
};