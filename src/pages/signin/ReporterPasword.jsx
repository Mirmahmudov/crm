import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

function ReporterPasword({ toast, setToken }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const handlePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/user/reporter-token/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          localStorage.setItem("crmToken", result.access_token);
          localStorage.setItem("crmPosition", result.position);
          setToken(localStorage.getItem("crmToken"));
          setLoading(false);
          toast.success("muvaffaqiyatli ro'yhatdan o'tildi");
          navigate("/");
        } else {
          toast.error("parolda hatolik bor");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("parol hato");
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
         
          <h1>Password</h1>

          <form onSubmit={handlePassword} className="formField">
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

            <button className="button">
              {loading ? "Loading ...." : "continue"}{" "}
            </button>
          </form>
         

          <div className="signUp">
            <p>Already have an account?</p>
            <Link to={"/"}>Sign In</Link>
          </div>
        </div>
        <div className="login_img test">
          <img src="/imgs/passwordImg2.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default ReporterPasword;
