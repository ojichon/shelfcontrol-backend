import express from "express";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/books", bookRoutes);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Add this error handling middleware
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

app.listen(8800, () => {
  console.log("Connected");
});
