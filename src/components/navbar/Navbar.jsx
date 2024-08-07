import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IoIosNotifications } from "react-icons/io";

function Navbar() {
  return (
    <>
      <div className="navbar">
       
        <div className="wrapper">
          <div className="space"></div>
          <div className="items">
            <div className="item">
              <h5></h5>
            </div>
            <Link
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
