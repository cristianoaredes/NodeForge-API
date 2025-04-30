const users = [];

exports.createUser = async ({ email, password }) => {
  const newUser = { email, password };
  users.push(newUser);
  return { email };
};

exports.findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};
