import express from 'express';
import { getDashboard , getDashboardChart } from '../controllers/dashboardController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, getDashboard);
router.get("/chart", getDashboardChart);

export default router;
