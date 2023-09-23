const UserService = require("../service/user.service");

// get - Select
// post - insert/create
// put - update
// delete - delete

const getAllUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator

  try {
    const result = UserService.getAllUsersApi();
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = { getAllUsers };
