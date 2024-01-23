import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  // getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../sellerControllers/userController.js";

import { authenticatesell, authorizeSeller } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticatesell, authorizeSeller);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticatesell, getCurrentUserProfile)
  .put(authenticatesell, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete(authenticatesell, authorizeSeller, deleteUserById)
  .get(authenticatesell, authorizeSeller, getUserById)
  .put(authenticatesell, authorizeSeller, updateUserById);

export default router;
