import express from "express";
import dotenv from "dotenv";
dotenv.config();

import Tables from "./app/schemas/tables_file.js";
import AuthRoutes from "./app/routes/auth_routes.js";
import UserRoutes from "./app/routes/user_routes.js";
import cors from "cors";

// ---- Configure App ----
const app = express();
app.use(cors());

// ---- Middlewares ----
app.use(express.json());

// ---- Tables Calling ----
Tables.usersTable();

// ---- Configure Routes ----
app.use("/api/authentication", AuthRoutes);
app.use("/api/user", UserRoutes);

// ---- Port Defining ----
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Server is running" });
});

// ---- App Run ----
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
