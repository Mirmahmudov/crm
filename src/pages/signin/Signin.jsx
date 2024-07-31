import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signin({ setToken, toast }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    // console.log(username, password);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/user/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.detail) {
          localStorage.setItem("crmToken", result.access);
          localStorage.setItem("crmPosition", result.position);
          setToken(localStorage.getItem("crmToken"));
          setLoading(false);
          toast.success("muvaffaqiyatli ro'yhatdan o'tildi");
        } else {
          setLoading(false);
          toast.error("user yoki parolda hatolik bor");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const passwordEye = () => {
    if (eye) {
      return <FaEye />;
    } else {
      return <FaEyeSlash />;
    }
  };
  return (
    <>
      <div className="signInContainer">
        <div className="loginContainer">
          <div className="logoContainer">
            <img src="./public/imgs/download.png" className="logo" alt="logo" />
          </div>
          <p className="getStarted">Let's get started!</p>
          <p className="loginMessage">Login to continue</p>
          <form onSubmit={handleLogin} className="formField">
            <input
              type="name"
              placeholder="Username "
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="inputs">
              <input
                type={!eye ? "Password" : "text"}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eyeClick"
                onClick={() => {
                  setEye(!eye);
                }}
              >
                {passwordEye()}
              </span>
            </div>
            <button className="button">
              {loading ? "Loading ...." : "Login"}
            </button>
          </form>

          <div className="forgotPassword">
            <Link to={"/"}> Forgot password?</Link>
            <br />
          </div>
          <hr />
          <div className="signUp">
            <p>do you need documents?</p>
            <Link to={"/password"}>documents</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
