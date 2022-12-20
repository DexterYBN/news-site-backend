const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json({ error: "User not found" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "30d",
      });

      res.json({ token, login: payload.login, id: payload._id });
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { login, password } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const users = await User.create({ login, password: hash });
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
