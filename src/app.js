import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express();

// ✅ FIX: Put CORS before all security middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 👈 For development
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Explicit cors setup (for production, restrict origins)
app.use(cors({
  origin: ["http://localhost:8080", "https://gauravchaudhari.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Routes
import userRouter from './routes/auth.routes.js'
import projectRouter from "./routes/project.routes.js"
import contactRouter from "./routes/contact.routes.js"
import analyticsRouter from "./routes/analytics.routes.js"
import aiRoutes from "./routes/ai.routes.js";
import blogRoutes from "./routes/blog.routes.js"

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/blog", blogRoutes);

export { app };
