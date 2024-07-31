import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IoIosNotifications } from "react-icons/io";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <a href="localhost:3000">
          <div className="headerlogo">
            <img src="/imgs/download.png" alt="" />
          </div>
        </a>
        <div className="wrapper">
          <div className="space"></div>
          <div className="items">
            <div className="item">
              <IoIosNotifications className="icon" />
              <div className="counter">1</div>
            </div>
            <Link
            // to="/employees/0"
            >
              <img
                src="https://st2.depositphotos.com/3695509/5337/i/450/depositphotos_53376063-stock-photo-portrait-of-a-tattooed-male.jpg"
                alt="Profile Avatar"
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
