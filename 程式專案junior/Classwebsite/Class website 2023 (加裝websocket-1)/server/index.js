// 導入必要模塊
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");

dotenv.config();

const redis = new Redis(); // 預設連接到 127.0.0.1:6379
const app = express(); // 創建Express應用
const server = http.createServer(app); // 通過Express應用創建HTTP服務器
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// MongoDB連接
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("連接到 MongoDB..."))
  .catch((e) => console.error("MongoDB 連接失敗: ", e));

// 配置Express應用
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/passport")(passport); // Passport配置

// 路由配置
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

// WebSocket邏輯與配置

io.use((socket, next) => {
  const token = socket.handshake.query.auth_token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});
io.on("connection", (socket) => {
  console.log("一個用戶連接了");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    const messageData = JSON.stringify({
      userId: msg.userId,
      text: msg.text,
      createdAt: new Date(),
    });
    redis.lpush("chatMessages", messageData);
  });

  socket.on("disconnect", () => {
    console.log("用戶斷開連接");
  });
});

// 啟動HTTP與WebSocket服務器
server.listen(8080, () => {
  console.log("服務器監聽在端口 8080...");
});

// 請注意不要重複 `app.listen`，只需要 `server.listen`
