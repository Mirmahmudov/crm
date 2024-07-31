import React, { useEffect, useState } from "react";
import "./Units.css";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaArrowDown, FaArrowUp, FaRegEye, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import LoaderAnimation from "../../components/loader/LoaderAnimation";

function Units({ toast }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("crmToken");

  const [addModal, setAddModal] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filter, setfilter] = useState([]);
  const [edit, setEdit] = useState("");
  const [editName, setEditName] = useState("");
  const [loader, setLoader] = useState(false);
  const [addUnit, setAddUnit] = useState("");

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: addUnit,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/units/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setLoader(false);
        toast.success("Birliklar muvaffaqiyatli qo'shildi");
        setAddModal(false);
        unitData();
        setAddUnit("");
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };
  const unitData = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/units/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  const editFilter = (id) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/units/${id}/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setfilter(result);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };
  const editUnit = (e) => {
    setLoader(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: `${editName}`,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/units/${edit}/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        unitData();
        setEditModal();
        setLoader(false);
        toast.success("Birliklar muvaffaqiyatli o'zgartirildi");
      })
      .catch((error) => console.error(error));
  };

  const deleteUnits = (id) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/units/${id}/`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Birliklar muvaffaqiyatli o'chirildi");
        setLoader(false);
        unitData();
      })
      .catch((error) => {
        console.error(error);
        toast.error("hatolik mavjud");
        setLoader(false);
      });
  };

  useEffect(() => {
    unitData();
  }, []);
  // sort
  const [sorting, setSorting] = useState(false);
  const renderArrow = () => {
    if (sorting) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };
  const sortByName = (key, order = sorting) => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a[key].toUpperCase(); // Ignore upper and lowercase
      const nameB = b[key].toUpperCase(); // Ignore upper and lowercase
      if (nameA < nameB) {
        return order === true ? -1 : 1;
      }
      if (nameA > nameB) {
        return order === true ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  return (
    <>
      {loader ? <LoaderAnimation /> : ""}
      <div className="units">
        <div className="topbar">
          <div className="recordstext">
            <span>O'lchov birliklari</span>
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
                    sortByName("name");
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    nomi
                    {renderArrow()}
                  </span>
                </th>
                <th>view</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>

                    <td
                      onClick={() => {
                        setviewModal(true);
                        editFilter(item.id);
                        setEdit(item.id);
                      }}
                    >
                      <FaRegEye />
                    </td>
                    <td
                      onClick={() => {
                        deleteUnits(item.id);
                      }}
                    >
                      <FaTrash />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={addModal ? "addModal active" : "addModal"}>
          <form onSubmit={handleSubmit} action="">
            <h3>o'lchov birligi qo'shish</h3>
            <div className="div">
              <label htmlFor="">O'lchov birligini kiriting</label>
              <input
                value={addUnit}
                onChange={(e) => setAddUnit(e.target.value)}
                type="text"
                placeholder="Dona"
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
            <h3 className="h3">o'lchov birligi</h3>
            <h4>
              <span> id : </span>
              {filter.id}
            </h4>
            <h4>
              <span> name : </span>
              {filter.name}
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
                  setEditName(filter.name);
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
          <form onSubmit={editUnit} action="">
            <h3>o'lchov birligini taxrirlash</h3>
            <div className="div">
              <label htmlFor="">O'lchov birligini kiriting</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                type="text"
                placeholder="Dona"
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

export default Units;
