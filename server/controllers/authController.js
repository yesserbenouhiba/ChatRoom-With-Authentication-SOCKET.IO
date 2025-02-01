const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }
    const user = await User.create({ username, password });
    user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    user.status = "online";
    user.save();
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signOut = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    user.status = "offline";
    user.save();
    res.status(200).json("User signed out");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "online" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getOnlineUsers,
};
