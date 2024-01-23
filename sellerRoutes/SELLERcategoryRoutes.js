import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../sellerControllers/categoryController.js";

import { authenticatesell, authorizeSeller } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticatesell, authorizeSeller, createCategory);
router.route("/:categoryId").put(authenticatesell, authorizeSeller, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticatesell, authorizeSeller, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
