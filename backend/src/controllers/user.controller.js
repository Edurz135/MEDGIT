const { getAllUsersApi } = require("../service/user.service");

// get - Select
// post - insert/create
// put - update
// delete - delete

const getAllUsers = async (req, res) => {
  const result = getAllUsersApi();
  return res.json(result);
};

module.exports = { getAllUsers };
