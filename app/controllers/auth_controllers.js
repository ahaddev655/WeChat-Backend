import authModals from "../models/auth_models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateSecureUID = () => {
  const randomHex = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `UID-${randomHex}`;
};

class AuthControllers {
  // ---- Register ----
  static register = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    // ---- Validations ----

    if (!fname || !lname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    try {
      // ---- Select the user by email ----

      const user = await authModals.find_user_by_email(email);

      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "User already exists" });
      }

      // ---- Hash Password ----

      const encrypted_password = await bcrypt.hash(password, 10);

      // ---- Generate Token ----

      const token = jwt.sign({ email: email }, process.env.JWT_KEY);

      // ---- Generate a UID ----

      const uid = generateSecureUID();

      // ---- Insert / Create User ----

      const nu = await authModals.create_user({
        uid: uid,
        fname: fname,
        lname: lname,
        email: email,
        password: encrypted_password,
        token: token,
      });

      return res.status(201).json({
        success: true,
        message: "Registeration has been successful",
        id: nu.insertId,
        uid: uid,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Login ----

  static login = async (req, res) => {
    const { email, password } = req.body;

    // ---- Validations ----

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    try {
      // ---- Select the user by email ----

      const user = await authModals.find_user_by_email(email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // ---- Password Validation ----
      const comparing = await bcrypt.compare(password, user["password"]);
      if (!comparing) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid Credentials" });
      }

      return res.status(201).json({
        success: true,
        message: "Login has been successful",
        id: user["id"],
        uid: user["uid"],
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Google Register ----

  static google_register = async (req, res) => {
    const { fname, lname, email } = req.body;

    // ---- Validations ----

    if (!fname || !lname || !email) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    try {
      // ---- Select the user by email ----

      const user = await authModals.find_user_by_email(email);

      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "User already exists" });
      }

      // ---- Hash Password ----

      const encrypted_password = await bcrypt.hash(
        "GOOGLE_SECURED_PASSWORD",
        10,
      );

      // ---- Generate Token ----

      const token = jwt.sign({ email: email }, process.env.JWT_KEY);

      // ---- Generate a UID ----

      const uid = generateSecureUID();

      // ---- Insert / Create User ----

      const nu = await authModals.create_user({
        uid: uid,
        fname: fname,
        lname: lname,
        email: email,
        password: encrypted_password,
        token: token,
      });

      return res.status(201).json({
        success: true,
        message: "Google Registeration has been successful",
        id: nu.insertId,
        uid: uid,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Google Login ----

  static google_login = async (req, res) => {
    const { email } = req.body;

    // ---- Validations ----

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    try {
      // ---- Select the user by email ----

      const user = await authModals.find_user_by_email(email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      return res.status(201).json({
        success: true,
        message: "Login has been successful",
        id: user["id"],
        uid: user["uid"],
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };
}

export default AuthControllers;
