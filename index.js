import express from "express";
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import spents from "./routes/spents.js";
import user from "./routes/user.js";
import products from "./routes/products.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/spents", spents);
app.use("/", user);
app.use("/products", products);
app.use("/uploads", express.static("uploads"));

const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/asoltec?retryWrites=true&w=majority";
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
