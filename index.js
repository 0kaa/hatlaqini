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


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});
app.use(cors({ origin: '*' }));


var io = require("socket.io")(http, {
  cors: {
    origin: '*',
  }
});
app.use("/", UserRoutes);
app.use('/type', TypeRoutes);
app.use("/locations", LocationRoutes);
app.use("/chat", ChatRoutes);
app.use("/categories", CategoriesRoutes);
app.use("/items", ItemsRoutes);
app.use("/uploads", express.static("uploads"));
const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/hatlaqini?retryWrites=true&w=majority";

app.set('socketio', io);
io.set('origins', 'https://127.0.0.1:3000');


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
