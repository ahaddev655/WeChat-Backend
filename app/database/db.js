import sql from "mysql2";
import dbConfig from "./../db.config.js";
const pool = sql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 10,
});

const db = pool.promise();

const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
};

export default db;
