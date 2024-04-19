const mongoose = require("mongoose");
const Redis = require("ioredis");
const redis = new Redis(); // 假设您的 Redis 服务器配置是默认的

// 定义 MongoDB 消息模型
const messageSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageSchema);

// 定义从 Redis 到 MongoDB 的数据转移函数
async function transferMessages() {
  let messages = await redis.lrange("chatMessages", 0, -1);
  await redis.del("chatMessages");

  // 解析消息并按 userId 分组
  const groupedMessages = messages.reduce((acc, message) => {
    const data = JSON.parse(message);
    if (!acc[data.userId]) {
      acc[data.userId] = [];
    }
    acc[data.userId].push({
      text: data.text,
      createdAt: data.createdAt,
    });
    return acc;
  }, {});

  // 对每个用户的消息进行处理
  for (let userId in groupedMessages) {
    await Message.insertMany(
      groupedMessages[userId].map((msg) => ({
        userId: mongoose.Types.ObjectId(userId), // 确保正确转换为 MongoDB ObjectId
        ...msg,
      }))
    );
    console.log(`Messages for user ${userId} moved from Redis to MongoDB.`);
  }
}

module.exports = transferMessages;
