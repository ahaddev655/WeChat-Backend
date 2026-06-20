import db from "../database/db.js";

class authModals {
  static find_user_by_email = async (email) => {
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return user[0];
  };
  static create_user = async ({ fname, lname, email, password, token, uid }) => {
    const query =
      "INSERT INTO users (uid, firstName, lastName, email, password, token) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [uid, fname, lname, email, password, token];
    const [results] = await db.execute(query, values);
    return results;
  };
}

export default authModals;
