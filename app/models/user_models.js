import db from "./../database/db.js";

class UserModals {
  // ---- Find the user by id ----
  static fetch_user_by_id = async (id) => {
    const query =
      "SELECT id, uid, firstName, lastName, email, role, status, isBlocked, user_created_at FROM users WHERE id = ?";
    const values = [id];
    const [rows] = await db.execute(query, values);

    return rows[0];
  };

  // ---- Set status to true ----

  static set_status_true = async (id) => {
    const query = "UPDATE users SET status = 1 WHERE id = ?";
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  };

  // ---- Set status to false ----

  static set_status_false = async (id) => {
    const query = "UPDATE users SET status = 0 WHERE id = ?";
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  };

  // ---- Fetch all users that are not equal to id ----

  static fetch_users_except_id = async (id) => {
    const query =
      "SELECT id, uid, firstName, lastName, email, role, status, isBlocked, user_created_at FROM users WHERE id <> ?";
    const values = [id];
    const [rows] = await db.execute(query, values);

    return rows;
  }
}

export default UserModals;
