import FriendsModals from "../models/friends_models.js";

class FriendsController {
  // ---- Fetch Friends ----
  static fetchFriends = async (req, res) => {
    const { id } = req.params;

    try {
      // ---- Fetch friends ----
      const raw_friends = await FriendsModals.fetch_friends_by_user_id(id);
      const friends = await raw_friends[0].friends_list;

      // ---- Validations ----

      if (friends.length < 1) {
        return res
          .status(404)
          .json({ success: false, error: "No Friends Added" });
      }

      // ---- Positive Response ----

      res.status(200).json({
        success: true,
        message: "Friends fetched successfully",
        friends,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };

  // ---- Add Friends ----

  static addFriends = async (req, res) => {
    const { friend_uid, id } = req.params;

    try {
      // ---- Fetch friends ----

      const raw_friends_list = await FriendsModals.fetch_friends_by_user_id(id);
      const friends_list = raw_friends_list[0]?.friends_list || [];

      // ---- Fetch User ----

      const user = await FriendsModals.fetch_user_by_uid(friend_uid);

      // ---- Validations ----

      if (!user) {
        res.status(404).json({ success: false, error: "User Not Found" });
      }

      const isAlreadyFriend = friends_list.some(
        (f) => f.friend_uid === user["uid"],
      );

      if (isAlreadyFriend) {
        return res.status(400).json({
          success: false,
          error: "This person is already in your friends list",
        });
      }

      // ---- New Friend List ----

      const new_friend = {
        friend_uid: user["uid"],
        friend_id: user["id"],
        friend_firstName: user["firstName"],
        friend_status: user["status"],
        friend_user_created_at: user["user_created_at"],
        friend_email: user["email"],
        friend_lastName: user["lastName"],
        friend_blocked: false,
      };

      // ---- Add Friend in the list ----

      await friends_list.push(new_friend);

      // ---- Save the JSON in Database ----

      await FriendsModals.update_friend_by_user_id({
        friends_list: friends_list,
        id: id,
      });

      // ---- Positive Response ----

      res.status(200).json({
        success: true,
        message: "Friend added successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.toString(),
      });
    }
  };
}

export default FriendsController;
