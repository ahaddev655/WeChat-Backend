import "dotenv/config";

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "usr_db01",
  password: process.env.DB_PASSWORD || "*3104944Tony",
  database: process.env.DB_NAME || "wechat_db",
};

export default dbConfig;
