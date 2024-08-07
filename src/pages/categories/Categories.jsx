import React, { useEffect, useState } from "react";
import "./Categories.css";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowUp, FaRegEye, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import LoaderAnimation from "../../components/loader/LoaderAnimation";
function Categories({ toast }) {
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filter, setfilter] = useState();

  const token = localStorage.getItem("crmToken");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [addName, setAddName] = useState("");
  const [Loader, setLoader] = useState(false);

  const getCategories = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/categories/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: addName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/categories/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAddModal(false);
        getCategories();
        setAddName("");
        setLoader(false);
        toast.success("kategoriya muvaffaqiyatli qo'shildi");
      })
      .catch((error) => console.error(error));
  };

  const filterCategories = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/category/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setfilter(result);
        console.log(result);
        setEditName(result.name);
      })
      .catch((error) => console.error(error));
  };

  const editCategories = (e) => {
    setLoader(true);

    e.preventDefault();
    console.log("salom");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: editName,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/category/${editId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        getCategories();
        setEditModal(false);
        setLoader(false);
        toast.success("kategoriya muvaffaqiyatli o'zgartirildi");
      })
      .catch((error) => console.error(error));
  };
  const deleteCategories = (id) => {
    setLoader(true);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token} `);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/category/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        getCategories();
        setLoader(false);
        toast.success("kategoriya muvaffaqiyatli o'chiradi");
      })
      .catch((error) => {
        console.error(error);
        toast.error("hatolik bor");
      });
  };

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
      {Loader ? <LoaderAnimation /> : ""}
      <div className="categories">
        <div className="topbar">
          <div className="recordstext">
            <span>Kategoriyalar </span>
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
                        filterCategories(item.id);
                        setEditId(item.id);
                      }}
                    >
                      <FaRegEye />
                    </td>
                    <td
                      onClick={() => {
                        deleteCategories(item.id);
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
            <h3>kategoriya qo'shish</h3>
            <div className="div">
              <label htmlFor="">kategoriya kiriting</label>
              <input
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                type="text"
                placeholder="kiyimlar"
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
            <h3 className="h3">Kategoriya</h3>
            <h4>
              <span> id : </span>
              {filter?.id}
            </h4>
            <h4>
              <span> name : </span>
              {filter?.name}
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
          <form onSubmit={editCategories} action="">
            <h3>kategoriya</h3>
            <div className="div">
              <label htmlFor="">kategoriya kiriting</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                type="text"
                placeholder="kiyimar"
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

export default Categories;
