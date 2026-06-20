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
}

export default MessagesController;
