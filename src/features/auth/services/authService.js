const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { createUser, findUserByEmail } = require('../repositories/userRepository');

exports.signupService = async ({ email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    const err = new Error('User already exists');
    err.status = 400;
    throw err;
  }
  return await createUser({ email, password });
};

exports.loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const payload = { email };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};
