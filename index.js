// import express from "express";
const express = require('express')
const bodyParser = require('body-parser')
const mongose = require('mongoose')
const cors = require('cors')
// import bodyParser from "body-parser";
// import mongose from "mongoose";
// import cors from "cors";
// import UserRoutes from "./routes/user.js";
// import CategoriesRoutes from "./routes/categories.js";
// import ItemsRoutes from "./routes/items.js";
// import ChatRoutes from "./routes/chat.js";
// import LocationRoutes from "./routes/location.js";
// import TypeRoutes from './routes/type.js';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(cors());
app.use(bodyParser.json({ limit: "1kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1kb", extended: true }));

app.use("/", (req, res) => {
  res.json('asd')
});
// app.use('/type', TypeRoutes);
// app.use("/locations", LocationRoutes);
// app.use("/chat", ChatRoutes);
// app.use("/categories", CategoriesRoutes);
// app.use("/items", ItemsRoutes);
// app.use("/uploads", express.static("uploads"));

const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/hatlaqini?retryWrites=true&w=majority";

app.set('socketio', io);

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
