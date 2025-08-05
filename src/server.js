import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbconnect.js";
import router from "./routes/routes.js";
// import filterText from "./validations/filterBadWords/filterBadWords.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", router);

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
