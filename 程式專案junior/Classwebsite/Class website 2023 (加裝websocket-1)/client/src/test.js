const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*", // 根据实际情况配置允许的来源
    methods: ["GET", "POST"],
  },
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const Redis = require("ioredis");
const redis = new Redis(); // 默认连接到 127.0.0.1:6379

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("连结到 MongoDB..."))
  .catch((e) => console.error("MongoDB 连接失败: ", e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

// WebSocket 逻辑
io.on("connection", (socket) => {
  console.log("一个用户连接了");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 广播消息
    // 可以添加将消息存储到 Redis 的逻辑
    redis.lpush("chatMessages", JSON.stringify(msg));
  });

  socket.on("disconnect", () => {
    console.log("用户断开连接");
  });
});

// 修改监听从app.listen改为server.listen
server.listen(8080, () => {
  console.log("后端服务器监听在端口 8080...");
});
