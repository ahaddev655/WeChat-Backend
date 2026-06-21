import MessageModels from "../models/messages_models.js";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

class MessagesController {
  // ---- Fetch Messages Controller ----
  static fetchMessages = async (req, res) => {
    const { id_1, id_2 } = req.params;

    try {
      //    ---- Fetch Messages ----
      const messages = await MessageModels.fetchMessages({
        id_1: id_1,
        id_2: id_2,
      });

      //    ---- Validation ----
      if (messages.length === 0) {
        return res.status(404).json({ error: "No messages found" });
      }

      return res
        .status(200)
        .json({ message: "Messages found", data: messages });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.toString() });
    }
  };

  // ---- Add Messages Controller ----

  static addMessage = async (req, res) => {
    const { id_1, id_2 } = req.params;
    const { messageText, sender, time } = req.body;

    try {
      //    ---- Validation ----

      if (!messageText || !sender || !time) {
        return res.status(400).json({ error: "Invalid message data" });
      }

      //    ---- Fetch Messages ----
      const raw_messages = await MessageModels.fetchMessages({
        id_1: id_1,
        id_2: id_2,
      });

      const dbMessages =
        raw_messages.length > 0 ? raw_messages[0].messages : "[]";
      const jsonString =
        typeof dbMessages === "string"
          ? dbMessages
          : JSON.stringify(dbMessages);
      const all_messages = JSON.parse(jsonString || "[]");

      // ---- Payload ----

      const payload = {
        sender: sender,
        message: messageText,
        time: time,
      };

      // ---- Add Message ----

      all_messages.push(payload);

      // ---- Save Message to DB ----

      await MessageModels.addMessage({
        id_1: id_1,
        id_2: id_2,
        messages: all_messages,
      });

      const pusherPayload = {
        sender: sender,
        message: messageText,
        time: time,
      };

      const sortedIds = [id_1, id_2].sort().join("-");
      await pusher.trigger(`chat-${sortedIds}`, "new-message", pusherPayload);

      return res.status(200).json({ message: "Messages sent" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.toString() });
    }
  };
}

export default MessagesController;
