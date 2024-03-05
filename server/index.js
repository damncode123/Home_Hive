import express from "express";
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.route.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/Home-Hive/auth", AuthRoute);

// Mongoose Setup
const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      dbName:"Home-Hive",
      // Remove deprecated options and add retryWrites and w options
      useNewUrlparser: true,
      useUnifiedTopoLogy: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

main();
