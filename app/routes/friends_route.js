import express from "express";
import FriendsController from "../controllers/friends_controller.js";

const router = express.Router();

// ---- Fetch Friends ----
router.get("/:id", FriendsController.fetchFriends);

// ---- Fetch Friends ----

router.put("/:friend_uid/:id", FriendsController.addFriends);

export default router;
