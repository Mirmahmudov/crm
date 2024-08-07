import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Box, TextField } from "@mui/material";

function Signin({ setToken, toast }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
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
         
          <h1>login</h1>
          <form onSubmit={handleLogin} className="formField">
            <TextField
              required
              id="outlined-required"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="inputs">
              <TextField
                id="outlined-password-input"
                label="Password"
                type={!eye ? "Password" : "text"}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div></div>
            </Box>
            <button className="button">
              {loading ? "Loading ...." : "Login"}
            </button>
          </form>

        
          <hr />
          <div className="signUp">
            <p>Do you need documents?</p>
            <Link to={"/password"}>documents</Link>
          </div>
        </div>
        <div className="login_img test">
          <img src="/imgs/passwordImg.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Signin;
