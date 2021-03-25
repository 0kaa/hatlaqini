import express from "express";
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import user from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import itemsRoutes from "./routes/itemsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", user);
app.use("/chat", chatRoutes);
app.use("/categories", categoriesRoutes);
app.use("/items", itemsRoutes);
app.use("/uploads", express.static("uploads"));
app.use((req, res) => {
  res.redirect("/");
  io.emit("message", 'hii');
});

const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/hatlaqini?retryWrites=true&w=majority";
io.on("connection", () => {
  console.log("a user is connected");
});
const PORT = process.env.PORT || 5000;
mongose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    http.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
