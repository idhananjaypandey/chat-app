import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { socketHandler } from "./socketHandler.js";
import { socketAuth } from "./middleware/socketAuth.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);




app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.use(socketAuth);
socketHandler(io);

server.listen(process.env.PORT, () =>
  console.log("🚀 Server running")
);
