import db from "../database/db.js";

class Tables {
  // ---- Users Table ----

  static usersTable = async () => {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          uid VARCHAR(255) NOT NULL UNIQUE,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          status BOOL DEFAULT FALSE,
          isBlocked BOOL DEFAULT FALSE,
          password TEXT NOT NULL,
          role VARCHAR(10) DEFAULT 'user',
          token TEXT NOT NULL,
          user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Users table verified/created successfully.");
    } catch (error) {
      console.log("Error Creating User Table: ", error);
    }
  };

  // ---- Friends Table ----

  static friendsTable = async () => {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS friends (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL UNIQUE,
          friends_list JSON DEFAULT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log("Friends table verified/created successfully.");
    } catch (error) {
      console.log("Error Creating Friends Table: ", error);
    }
  };

  // ---- Messages Table ----

  static messagesTable = async () => {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          sender_id INT NOT NULL,
          receiver_id INT NOT NULL,
          messages JSON NOT NULL
        )
      `);
      console.log("Messages table verified/created successfully.");
    } catch (error) {
      console.log("Error Creating Messages Table: ", error);
    }
  };
}

export default Tables;
