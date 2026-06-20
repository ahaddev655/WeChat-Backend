import db from "./../database/db.js";

class MessageModels {
  // ---- Fetch Messages Models ----
  static fetchMessages = async ({ id_1, id_2 }) => {
    const user_id_1 = Math.min(id_1, id_2);
    const user_id_2 = Math.max(id_1, id_2);

    const query =
      "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?)";

    const values = [user_id_1, user_id_2];

    const [rows] = await db.execute(query, values);

    return rows;
  };
}

export default MessageModels;
