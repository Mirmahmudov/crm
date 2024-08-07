import React, { useEffect, useState } from "react";
import "./Password.css";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import LoaderAnimation from "../../components/loader/LoaderAnimation";

function Password({ toast }) {
  const token = localStorage.getItem("crmToken");
  const [data, setData] = useState([]);
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [loader, setLoader] = useState(false);

  const getPassword = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/user/report-code/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editPassword = (e) => {
    setLoader(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      password,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/user/report-code/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEdit(false);

        getPassword();
        setLoader(false);
        toast.success("password muvaffaqiyatli o'zgartiril! ");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Hatolik bor yoki sizga parol o'zgartirish  mumkin emas !");
      });
  };

  useEffect(() => {
    getPassword();
  }, []);

  return (
    <>
      {loader ? <LoaderAnimation /> : ""}
      <div className="password">
        <div className="topbar">
          <div className="recordstext">{/* <span>Password </span> */}</div>
          <Link
            onClick={() => {
              setAddModal(true);
            }}
            to=""
          >
            <div className="addicon">{/* <IoMdAdd /> */}</div>
          </Link>
        </div>
        <div className="test">
          <h5>parol : {data.password} </h5>
          <button
            onClick={() => {
              setEdit(true);
              setPassword(data.password);
            }}
          >
            <FaRegEdit /> tahrirlash
          </button>
        </div>

        <div className={!edit ? " container" : "container active"}>
          <form onSubmit={editPassword} action="">
            <h2>parol</h2>
            <input
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>qo'shish</button>
            <div
              className="exit"
              onClick={() => {
                setEdit(false);
              }}
            >
              <FaXmark />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Password;
