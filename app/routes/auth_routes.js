import express from "express";
import AuthControllers from "./../controllers/auth_controllers.js";

const router = express.Router();

// ---- Default Route ----
router.get("/", (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Authentication APIs are working fine" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Authentication APIs are not working!" });
  }
});

// ---- Register Route ----
router.post("/register", AuthControllers.register)

// ---- Login Route ----
router.post("/login", AuthControllers.login)

// ---- Google Register Route ----
router.post("/google-register", AuthControllers.google_register)

// ---- Google Login Route ----
router.post("/google-login", AuthControllers.google_login)

export default router;
