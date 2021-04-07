import express from "express";
import { userRegister, userLogin, getUsers, getProfile, userUpdate } from "../controllers/UserController.js";
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

router.post("/user/update", [auth, upload.single("image")], userUpdate);

router.post("/signup", [
  check("email", "يرجي ادخال البريد الالكتروني بطريقة صحيحة").isEmail(),
  check("password", "لابد ان يكون كلمة المرور اكثر من 6 ارقام").isLength({
    min: 6,
  }),
], userRegister);

// [POST] /logout
router.post('/logout', (_req, res) => {
  res.json({ status: 'OK' })
})

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userLogin
);

export default router;
