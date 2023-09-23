// importar models

const getAllUsersApi = () => {
  // realizar búsqueda en bd

  try {
    // var users = await User.find(query)
    // return users;
    return ["asdf"];
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

module.exports = { getAllUsersApi };
