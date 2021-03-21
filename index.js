import express from "express";
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import user from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import itemsRoutes from "./routes/itemsRoutes.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", user);
app.use("/categories", categoriesRoutes);
app.use("/items", itemsRoutes);
app.use("/uploads", express.static("uploads"));
app.use((req, res) => {
  res.redirect("/");
});

const CONNECTION_URL = "mongodb+srv://mahmoud:8u4xwga99ahmiz1q@cluster0.bktlm.mongodb.net/hatlaqini?retryWrites=true&w=majority";
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
