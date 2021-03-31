import { User } from "../models/Model.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (e) {
    res.send({ message: e.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const username = req.query.user;
    const oneUser = await User.findOne({
      username,
    }).select("-password");

    const users = await User.find().select("-password");

    if (username) {
      res.status(201).json(oneUser);
    } else {
      res.status(201).json(users);
    }
  } catch (error) {
    res.status(404).json({
      message: "error",
    });
  }
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "يوجد خطأ في اسم المستخدم او كلمة المرور يرجي اعادة المحاولة"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const userResponse = {
      _id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      username: user.username,
      image: user.image
    };

    jwt.sign(payload, "randomString", { expiresIn: '1h', }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token,
        userResponse,
      });
    }
    );
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};

export const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const data = req.body;
  const image = req.file;
  if (image) {
    data.image = req.protocol + "://" + req.get("host") + "/" + image.path;
  } else {
    res.status(404).json({ message: "Image Required" });
  }
  try {
    var user = await User.findOne({
      email: data.email,
    });
    user = new User(data);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
    await user.save();
    const userResponse = {
      _id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      username: user.username,
      image: user.image
    };
    jwt.sign({ user: { id: user.id } }, "randomString", { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          userResponse,
        });
      }
    );

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
