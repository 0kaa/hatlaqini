import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import CategoriesRoutes from "./routes/CategoriesRoutes.js";
import ItemsRoutes from "./routes/ItemsRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import LocationRoutes from "./routes/LocationRoutes.js";
import TypeRoutes from './routes/TypeRoutes.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(cors());
app.use(bodyParser.json({ limit: "1kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1kb", extended: true }));

app.use("/", UserRoutes);
app.use('/type', TypeRoutes);
app.use("/locations", LocationRoutes);
app.use("/chat", ChatRoutes);
app.use("/categories", CategoriesRoutes);
app.use("/items", ItemsRoutes);
app.use("/uploads", express.static("uploads"));

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
