import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Omborchi.css";
import { FaArrowDown, FaArrowUp, FaRegEye } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import LoaderAnimation from "../../components/loader/LoaderAnimation";

function Omborchi({ toast }) {
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const [userData, setUserData] = useState([]);
  const [filter, setfilter] = useState();

  // edit
  const [edit_Username, setEdit_Username] = useState("");
  const [edit_Password, setEdit_Password] = useState("");
  const [edit_First_name, setEdit_First_name] = useState("");
  const [edit_Last_name, setEdit_Last_name] = useState("");
  const [editId, setEditId] = useState("");
  // edit
  const token = localStorage.getItem("crmToken");
  const [loader, setLoader] = useState(false);
  const [sorting, setSorting] = useState(false);

  const filterUser = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/user/omborchi/detail/?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setfilter(result);
        setEdit_Username(result.username);
        setEdit_Password(result.password);
        setEdit_First_name(result.first_name);
        setEdit_Last_name(result.last_name);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      username,
      password,
      first_name,
      last_name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/user/omborchi/new/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.detail) {
          setAddModal(false);
          getUserData();

          setUsername("");
          setLast_name("");
          setFirst_name("");
          setPassword("");
          setLoader(false);
          toast.success("Omborchi qo'shildi!");
        } else {
          setAddModal(false);
          getUserData();
          setLoader(false);
          toast.error("Hatolik bor yoki sizga user qo'shish mumkin emas !");
        }
      })
      .catch((error) => console.error(error));
  };

  const editSubmit = (e) => {
    setLoader(true);

    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      username: edit_Username,
      first_name: edit_First_name,
      last_name: edit_Last_name,
      password: edit_Password,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/user/omborchi/update/${editId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setEditModal(false);
        getUserData();
        setLoader(false);
        toast.success("omborchi ma'lumotlar o'zgartirildi");
      })
      .catch((error) => console.error(error));
  };

  const getUserData = () => {
    setLoader(true);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/user/omborchilar/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.detail) {
          setUserData(result);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const sortByUsername = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.username.localeCompare(b.username);
      } else if (order === false) {
        return b.username.localeCompare(a.username);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };
  const sortByName = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.first_name.localeCompare(b.first_name);
      } else if (order === false) {
        return b.first_name.localeCompare(a.first_name);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };
  const sortBySurname = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.last_name.localeCompare(b.last_name);
      } else if (order === false) {
        return b.last_name.localeCompare(a.last_name);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };
  const renderArrow = () => {
    if (sorting) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };
  return (
    <>
      {loader ? <LoaderAnimation /> : ""}

      <div className="omborchi">
        <div className="topbar">
          <div className="recordstext">
            <span>Omborchilar</span>
          </div>
          <Link
            onClick={() => {
              setAddModal(true);
            }}
            to=""
          >
            <div className="addicon">
              <IoMdAdd />
            </div>
          </Link>
        </div>
        <div className="tables">
          <table width={"100%"}>
            <thead>
              <tr>
                <th>№</th>
                <th
                  onClick={() => {
                    sortByUsername(userData);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    foydalanuvchi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByName(userData);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    ism
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortBySurname(userData);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    familiya
                    {renderArrow()}
                  </span>
                </th>
                <th>
                  <span>
                    View
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username.slice(0, 25)}</td>
                    <td>{item.first_name.slice(0, 25)}</td>
                    <td>{item.last_name.slice(0, 25)}</td>
                    <td
                      onClick={() => {
                        setviewModal(true);
                        filterUser(item.id);
                        setEditId(item.id);
                      }}
                    >
                      <FaRegEye />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={addModal ? "addModal active" : "addModal"}>
          <form onSubmit={handleSubmit} action="">
            <h3>Omborchi qo'shish</h3>
            <div className="div">
              <label htmlFor="">Foyddalanuvchi nomi kirting</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Asadbek"
                required
              />
            </div>
            <div className="div">
              <label htmlFor=""> parol kirting</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Ac1q3ew4w321re"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">Foydalanuvchi ismini kirting</label>
              <input
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                type="text"
                placeholder="Asadbek"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">foydalanuvchi familiyasini kirting</label>
              <input
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                type="text"
                placeholder="Mirmahmudov"
                required
              />
            </div>
            <div className="btn">
              <button>Add</button>
            </div>
            <div
              onClick={() => {
                setAddModal(false);
              }}
              className="exit"
            >
              <FaXmark />
            </div>
          </form>
        </div>
        <div className={viewModal ? "  viewModal active " : " viewModal "}>
          <div className="box">
            <h3 className="h3">omborchi</h3>
            <h4>
              <span> id : </span>
              {filter?.id}
            </h4>
            <h4>
              <span> USerName : </span>
              {filter?.username.slice(0, 25)}
            </h4>

            <h4>
              <span> Ismi : </span>
              {filter?.first_name.slice(0, 25)}
            </h4>
            <h4>
              <span> familiya :</span> {filter?.last_name.slice(0, 25)}
            </h4>
            <h4>
              <span> Parol : </span> *******
            </h4>
            <div className="btns">
              <button
                onClick={() => {
                  setviewModal(false);
                }}
                className="close"
              >
                close
              </button>
              <button
                onClick={() => {
                  setEditModal(true);
                  setviewModal(false);
                  console.log("Aasdbek", item.id);
                }}
                className="edit"
              >
                edit
              </button>
            </div>
            <div
              onClick={() => {
                setviewModal(false);
              }}
              className="exit"
            >
              <FaXmark />
            </div>
          </div>
        </div>
        <div className={editModal ? "editModal active " : "editModal "}>
          <form onSubmit={editSubmit} action="">
            <h3>Omborchi Tahrirlash</h3>
            <div className="div">
              <label htmlFor="">Foyddalanuvchi nomi kirting</label>
              <input
                value={edit_Username}
                onChange={(e) => setEdit_Username(e.target.value)}
                type="text"
                placeholder="Asadbek"
                required
              />
            </div>
            <div className="div">
              <label htmlFor=""> parol kirting</label>
              <input
                value={edit_Password}
                onChange={(e) => setEdit_Password(e.target.value)}
                type="password"
                placeholder="Ac1q3ew4w321re"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">Foydalanuvchi ismini kirting</label>
              <input
                value={edit_First_name}
                onChange={(e) => setEdit_First_name(e.target.value)}
                type="text"
                placeholder="Asadbek"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">foydalanuvchi familiyasini kirting</label>
              <input
                value={edit_Last_name}
                onChange={(e) => setEdit_Last_name(e.target.value)}
                type="text"
                placeholder="Mirmahmudov"
                required
              />
            </div>
            <div className="btn">
              <button>Add</button>
            </div>
            <div
              onClick={() => {
                setEditModal(false);
              }}
              className="exit"
            >
              <FaXmark />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Omborchi;
