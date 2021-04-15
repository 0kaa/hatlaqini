import express from "express";
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import UserRoutes from "./routes/user.js";
import CategoriesRoutes from "./routes/categories.js";
import ItemsRoutes from "./routes/items.js";
import ChatRoutes from "./routes/chat.js";
import LocationRoutes from "./routes/location.js";
import TypeRoutes from './routes/type.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const app = express();
var http = require("http").Server(app);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({ origin: '*' }));
app.use("/", UserRoutes);
app.use('/type', TypeRoutes);
app.use("/locations", LocationRoutes);
app.use("/chat", ChatRoutes);
app.use("/categories", CategoriesRoutes);
app.use("/items", ItemsRoutes);
app.use("/uploads", express.static("uploads"));
const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/hatlaqini?retryWrites=true&w=majority";

var io = require("socket.io")(http, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});
app.set('socketio', io);




const PORT = process.env.PORT || 5000;
mongose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
