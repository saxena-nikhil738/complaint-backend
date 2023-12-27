import express from "express";
import cors from "cors";
import { collection } from "./models/db.js";
import mongoose from "mongoose";
import router from "./Routes/route.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
// import { dirname } from "./client/build";

const __dirname = path.resolve();
const app = express();
app.use(express.json());

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.get("/", function (req, res) {
//   app.use(express.static(path.resolve(__dirname, "./client/build")))
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

const USER = process.env.USER_NAME;
const PASS = process.env.PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${USER}:${PASS}@cluster0.xewjt.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(console.log("server is running"))
  .catch((err) => {
    if (!err.data?.message) {
      console.log("Server error please try later!");
    }
  });

app.use("/", router);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
