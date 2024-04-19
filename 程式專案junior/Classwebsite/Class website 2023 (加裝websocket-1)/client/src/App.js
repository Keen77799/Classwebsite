import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import ChatRoom from "./components/chatroom-component"; // 确保聊天室组件的路径正确
import { SocketProvider } from "./components/socketProvider";
// 导入你的SocketProvider

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  // 当 currentUser 更新时，您可能需要重新获取 token
  // 并可能需要将 token 状态移到这里来，以便传递给 SocketProvider
  const token = currentUser?.accessToken; // 假设 JWT 存储在 accessToken 属性中

  return (
    <SocketProvider token={token}>
      {" "}
      {/* 包装整个应用并传递token */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route
              path="login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="course"
              element={
                <CourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="postCourse"
              element={
                <PostCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="enroll"
              element={
                <EnrollComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Route>
        </Routes>
        {/* 只有当用户登录时才显示聊天室 */}
        {currentUser && <ChatRoom />}
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
