import express from "express";
import bookRoutes from "./routes/books.js"
import userRoutes  from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());



app.use("/api/books", bookRoutes)
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)



app.listen(8800, () => {
    console.log("Connected")
} )