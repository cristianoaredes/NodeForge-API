const { signupService, loginService } = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await loginService(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
