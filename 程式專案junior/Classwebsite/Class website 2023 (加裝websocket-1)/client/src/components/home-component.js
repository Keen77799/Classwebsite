import React from "react";
import { Link } from "react-router-dom";
import myImage from "../image/9961072.jpg";
import myImage2 from "../image/pexels-linda-ellershein-3127880.jpg";
const HomeComponent = () => {
  const imageStyle = {
    width: "100%", // 相同的寬度
    height: "500px", // 相同的高度
    objectFit: "cover", // 圖片适应框架
  };

  const secondImageStyle = {
    width: "100%", // 相同的寬度
    height: "500px", // 相同的高度
    objectFit: "cover", // 圖片适应框架

    // 在小於或等於 768px 寬度的螢幕上，將高度調整為自適應
    "@media (max-width: 768px)": {
      height: "auto",
    },
  };

  const studentSectionStyle = {
    marginTop: "3rem", // 調整上邊距
  };

  const tutorSectionStyle = {
    marginTop: "3rem", // 調整上邊距
  };
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">學習系統</h1>
            <p className="col-md-8 fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB
              作為後端服務器。這種項目稱為 MERN
              項目，它是創建現代網站的最流行的方式之一。
            </p>
            <Link to="/login">
              <button className="btn btn-primary btn-lg" type="button">
                登入並開始使用。
              </button>
            </Link>
          </div>
        </div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={myImage2}
                className="d-block w-100"
                style={secondImageStyle}
                alt="Image 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={myImage}
                className="d-block w-100"
                style={imageStyle}
                alt="Image 2"
              />
            </div>
            {/* 可以增加更多的輪播項目 */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6" style={studentSectionStyle}>
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>作為一個學生</h2>
              <p>
                學生可以註冊他們喜歡的課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <Link to="/register">
                <button className="btn btn-outline-light" type="button">
                  註冊一個帳號
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6" style={tutorSectionStyle}>
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>作為一個導師</h2>
              <p>
                您可以通過註冊成為一名講師，並開始製作在線課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <Link to="/login">
                <button className="btn btn-outline-secondary" type="button">
                  登入並開始開設課程
                </button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Justin Kuo
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
