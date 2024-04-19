// src/SocketProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const token = localStorage.getItem("jwtToken"); // 從 localStorage 中獲取 JWT

  useEffect(() => {
    // 僅在有 token 時才連接
    if (token) {
      const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL, {
        query: { auth_token: token },
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
