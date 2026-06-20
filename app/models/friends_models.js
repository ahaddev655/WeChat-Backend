import db from "./../database/db.js";

class FriendsModals {
  // ---- Fetch Friends ----
  static fetch_friends_by_user_id = async (id) => {
    const query = "SELECT friends_list FROM friends WHERE user_id = ?";
    const values = [id];

    const [rows] = await db.execute(query, values); 

    return rows;
  };

  // ---- Fetch User By UID ----

  static fetch_user_by_uid = async (uid) => {
    const query =
      "SELECT id, uid, firstName, lastName, email, status, user_created_at FROM users WHERE uid = ?";
    const values = [uid];

    const [rows] = await db.execute(query, values);

    return rows[0];
  };

  // ---- Add Friend by id ----
  static update_friend_by_user_id = async ({ id, friends_list }) => {
    const query =
      "INSERT INTO friends (user_id, friends_list) VALUES (?, ?) ON DUPLICATE KEY UPDATE friends_list = VALUES(friends_list)";
    const values = [id, JSON.stringify(friends_list)];

    const [rows] = await db.execute(query, values);

    return rows;
  };
}

export default FriendsModals;
