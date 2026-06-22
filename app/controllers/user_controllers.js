import UserModals from "../models/user_models.js";

class UserControllers {
  // ---- Fetch User Details ----
  static fetchUserDetails = async (req, res) => {
    const { id, uid } = req.params;

    try {
      const user = await UserModals.fetch_user_by_id(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User Not Found" });
      }

      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user_details: user,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Set status true ----

  static userActive = async (req, res) => {
    const { id } = req.params;

    try {
      // ---- Find the user ----
      const user = await UserModals.fetch_user_by_id(id);

      // ---- Validations ----
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User Not Found" });
      }

      // ---- Status Change ----
      await UserModals.set_status_true(id);

      // ---- Positive Response ----
      return res
        .status(200)
        .json({ success: true, message: "User set to active" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Set status false ----

  static userInactive = async (req, res) => {
    const { id } = req.params;

    try {
      // ---- Find the user ----
      const user = await UserModals.fetch_user_by_id(id);

      // ---- Validations ----
      if (!user) {
        return res.status(404).json({ success: false, error: "User Not Found" });
      }

      // ---- Status Change ----
      await UserModals.set_status_false(id);

      // ---- Positive Response ----
      return res.status(200).json({ success: true, message: "User set to inactive" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Fetch all users ----

  static fetchUsers = async (req, res) => {
    const { id } = req.params;

    try {
      // ---- Find the user ----
      const users = await UserModals.fetch_users_except_id(id);

      // ---- Validations ----
      if (users.length < 0) {
        return res.status(404).json({ success: false, error: "No users found" });
      }

      // ---- Positive Response ----
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users: users,
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

export default UserControllers;
