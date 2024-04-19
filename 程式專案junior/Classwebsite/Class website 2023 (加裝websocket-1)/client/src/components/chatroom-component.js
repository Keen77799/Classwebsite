// src/components/chatroom-component.js
import React, { useState, useEffect } from "react";
import { useSocket } from "./socketProvider"; // 確保正確引入了 useSocket
import "./chatRoom.css"; // 導入聊天室的样式

const ChatRoom = () => {
  const socket = useSocket(); // 直接使用 useSocket 獲取 context 中的 socket 實例
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (newMessage) => {
        setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
      });
    }
    console.log("連接成功 ");
    return () => {
      if (socket) {
        socket.off("chat message");
      }
    };
  }, [socket]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    console.log("訊息測試");
    if (message && socket) {
      socket.emit("chat message", message);
      console.log("清除輸入框");
      setMessage(""); // 清空输入框
    }
  };


//單純傳送給後端

  
  return (
    <div className="chatroom">
      <div className="chatroom-header">聊天室</div>
      <ul className="chatroom-content">
        {chatHistory.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div className="chatroom-input">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入消息..."
          />
          <button type="submit">发送</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
