import db from "../database/db.js";

// ---- Users Table ----
class Tables {
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
}

export default Tables;
