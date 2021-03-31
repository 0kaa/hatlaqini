import express from "express";
import { userRegister, userLogin, getUsers, getProfile } from "../controllers/UserController.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = express.Router();
import auth from "../middleware/auth.js";
const { check } = require("express-validator/check");
import upload from './../utilities/upload.js'

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.get("/users", getUsers);

router.get("/", (req, res) => {
  res.send("hi");
});

router.get("/profile", auth, getProfile);

router.post("/signup", upload.single("image"), userRegister);

router.post(
  "/login",
  [
    check("username", "Please enter a valid username"),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userLogin
);

export default router;
