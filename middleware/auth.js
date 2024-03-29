import { createRequire } from "module";

const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(500).send({ message: e.message, });
  }
};

export default auth;
