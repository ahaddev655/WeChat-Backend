import express from "express";
import UserControllers from "../controllers/user_controllers.js";

const router = express.Router();

// ---- User Details ----

router.get("/user/:uid/:id", UserControllers.fetchUserDetails);

// ---- Set status True ----

router.put("/status-true/:id", UserControllers.userActive);

// ---- Set status False ----

router.put("/status-false/:id", UserControllers.userInactive);

// ---- Fetch all users ----

router.get("/users/:id", UserControllers.fetchUsers);

export default router;
