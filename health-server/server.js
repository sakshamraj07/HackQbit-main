import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
// ✅ Added for Alerts Feature
import alertRoutes from "./routes/alerts.js";
import { startScheduler } from "./utils/scheduler.js";
// ✅ End additions
import aiRoutes from "./routes/aiRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import consultRoutes from "./routes/consultRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

// ✅ Allowed origins
const allowedOrigins = ["http://localhost:5173","http://localhost:5174","https://smart-healthcare-diagnosis.netlify.app", "http://127.0.0.1:5173"];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully!");
});

// ✅ Socket.IO setup (🟢 Only for Community Chat)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Community Chat Socket Logic
io.on("connection", (socket) => {
  console.log(`💬 Community user connected: ${socket.id}`);

  socket.on("joinCommunity", (room) => {
    socket.join(room);
    console.log(`👥 Joined community room: ${room}`);
  });

  socket.on("communityMessage", (msg) => {
    io.to(msg.room).emit("newCommunityMessage", msg);
    console.log(`📢 Community message in ${msg.room}: ${msg.text}`);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// ✅ Routes (Community gets io for real-time)
app.use("/api/auth", authRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/community", communityRoutes(io)); // keep socket for community only
app.use("/api/consult", consultRoutes); // ❌ no socket here (JSON-based doctor chat)
app.use("/api/health", healthRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Added new routes for alert preferences
app.use("/api/alerts", alertRoutes);

// ✅ Start automatic email notification scheduler
startScheduler();
// ✅ End additions

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
