import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../routes/orderController.js";

import { authenticatesell, authorizeSeller } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticatesell, createOrder)
  .get(authenticatesell, authorizeSeller, getAllOrders);

router.route("/mine").get(authenticatesell, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authenticatesell, findOrderById);
router.route("/:id/pay").put(authenticatesell, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticatesell, authorizeSeller, markOrderAsDelivered);

export default router;
