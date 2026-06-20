import MessageModels from "../models/messages_models.js";

class MessagesController {
  // ---- Fetch Messages Controller ----
  static fetchMessages = async (req, res) => {
    const { id_1, id_2 } = req.params;

    try {
      //   ---- Fetch Messages ----
      const messages = await MessageModels.fetchMessages({
        id_1: id_1,
        id_2: id_2,
      });

      //   ---- Validation ----
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

  // ---- Fetch Messages Controller ----

  static addMessage = async (req, res) => {
    const { id_1, id_2 } = req.params;
    const { messageText, sender, time } = req.body;
    let all_messages = [];

    try {
      //   ---- Fetch Messages ----
      const raw_messages = await MessageModels.fetchMessages({
        id_1: id_1,
        id_2: id_2,
      });

      const messages = raw_messages.length > 0 ? raw_messages[0].messages : [];

      all_messages = messages;

      //   ---- Validation ----

      if (!messageText || !sender || !time) {
        return res.status(400).json({ error: "Invalid message data" });
      }

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

      return res.status(200).json({ message: "Messages sent" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.toString() });
    }
  };
}

export default MessagesController;
