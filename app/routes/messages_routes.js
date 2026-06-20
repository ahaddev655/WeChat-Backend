import express from "express";
import MessagesController from "../controllers/messages_controllers.js";

const router = express.Router();

// ---- Fetch Messages Routes ----

router.get("/:id_1/:id_2", MessagesController.fetchMessages);
router.post("/add/:id_1/:id_2", MessagesController.addMessage);

export default router;
