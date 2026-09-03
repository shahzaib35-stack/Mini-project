import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import requirementRoutes from "./routes/requirement.routes.js"
import { connectDB } from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config(); 

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

await connectDB();

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/auth", authRoutes);
app.use("/form",requirementRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});