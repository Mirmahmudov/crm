import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Product.css";
import { FaArrowDown, FaArrowUp, FaRegEye, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import LoaderAnimation from "../../components/loader/LoaderAnimation";
function Product({ toast }) {
  const [addModal, setAddModal] = useState(false);
  const token = localStorage.getItem("crmToken");

  const [viewModal, setviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [product_Data, setProduct_Data] = useState([]);
  // edit
  const [product_name, setProduct_Name] = useState("");
  const [product_Dect, setProduct_Dect] = useState("");
  const [product_Category, setProduct_Category] = useState("");
  const [product_Price, setProduct_Price] = useState("");
  const [product_Unit, setProduct_Unit] = useState("");
  const [product_Quantity, setProduct_Quantity] = useState("");
  const [loader, setLoader] = useState(false);

  // edit

  // add

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("3");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("3");
  const [quantity, setQuantity] = useState("");

  // add

  const [filter, setfilter] = useState();
  const [editId, setEditId] = useState("");
  const [sorting, setSorting] = useState(false);

  const getProductData = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/products/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProduct_Data(result);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  const filterProduct = (id) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/product/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setfilter(result);
        setProduct_Name(result.name);
        setProduct_Dect(result.description);
        setProduct_Category(result.category);
        setProduct_Price(result.price);
        setProduct_Unit(result.unit);
        setProduct_Quantity(result.quantity);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  const editProductSubmit = (e) => {
    setLoader(true);
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token} `);

    const raw = JSON.stringify({
      name: product_name,
      description: product_Dect,
      category: product_Category,
      price: product_Price,
      unit: product_Unit,
      quantity: product_Quantity,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/product/${editId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        getProductData();
        setEditModal(false);
        setLoader(false);
        toast.success("mahsulot tahrirlandi");
      })
      .catch((error) => console.error(error));
  };

  const deleteProduct = (id) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://omborxonacrm.pythonanywhere.com/product/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        getProductData();
        setLoader(false);
        toast.success("mahsulot o'chirildi");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProductData();
    getCategory();
    getUnit();
  }, []);

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name,
      description,
      category,
      price,
      unit,
      quantity: "465465",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/products/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddModal(false);
        getProductData();
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setLoader(false);
        toast.success("mahsulot muvaffaqiyatli qo'shildi");
      })
      .catch((error) => {
        console.error(error);
        toast.error("xatolik bor");
      });
  };

  // sort

  const renderArrow = () => {
    if (sorting) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const sortByName = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.name.localeCompare(b.name);
      } else if (order === false) {
        return b.name.localeCompare(a.name);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };

  const sortByDesc = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.description.localeCompare(b.description);
      } else if (order === false) {
        return b.description.localeCompare(a.description);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };

  const sortByCategory = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.category - b.category;
      } else {
        return b.category - a.category;
      }
    });
  };

  const sortByPrice = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.price.localeCompare(b.price);
      } else if (order === false) {
        return b.price.localeCompare(a.price);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };

  const sortByCode = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.prod_code.localeCompare(b.prod_code);
      } else if (order === false) {
        return b.prod_code.localeCompare(a.prod_code);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };

  const sortByQuantiy = (data, order = sorting) => {
    return data.sort((a, b) => {
      if (order === true) {
        return a.quantity.localeCompare(b.quantity);
      } else if (order === false) {
        return b.quantity.localeCompare(a.quantity);
      } else {
        throw new Error("Order must be 'asc' or 'desc'");
      }
    });
  };
  // data

  const [categoryData, setCategoryData] = useState();
  const [unitData, setUnitData] = useState();

  const getCategory = () => {
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
        setCategoryData(result);
      })
      .catch((error) => console.error(error));
  };
  const getUnit = () => {
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
        console.log(result);
        setUnitData(result);
      })
      .catch((error) => console.error(error));
  };

  console.log();

  return (
    <>
      {loader ? <LoaderAnimation /> : ""}
      <div className="products">
        <div className="topbar">
          <div className="recordstext">
            <span>Mahsulotlar</span>
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
                    sortByName(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    nomi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByDesc(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    tavsifi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByCategory(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    kategoriya
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByPrice(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    narxi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByCode(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    birligi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByDesc(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    mahsulot_kodi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByQuantiy(product_Data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    miqdori
                    {renderArrow()}
                  </span>
                </th>
                <th>view</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {product_Data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      {categoryData?.find((e) => e.id === item.category)?.name}
                    </td>
                    <td>{item.price}</td>
                    <td>
                      {unitData?.find((e) => e.id === item.unit)?.name}
                    </td>
                    <td>{item.prod_code}</td>
                    <td>{item.quantity}</td>
                    <td
                      onClick={() => {
                        setviewModal(true);
                        setEditId(item.id);
                        filterProduct(item.id);
                      }}
                    >
                      <FaRegEye />
                    </td>
                    <td
                      onClick={() => {
                        deleteProduct(item.id);
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
            <h3>Mahsulot qo'shish</h3>
            <div className="div">
              <label htmlFor="">Mahsulot nomini kiriting</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="kartoshka"
                required
              />
            </div>
            <div className="div">
              <label htmlFor=""> mahsulotga tavsif bering</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="bozordan"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">kategoriyani tanlang </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="2">kiyimlar </option>
                <option value="3">xo'jalik butumlari</option>
                <option value="4">texnika</option>
                <option value="5"> oziq ovqat </option>
              </select>
            </div>
            <div className="div">
              <label htmlFor="">narxini kiriting</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="45000"
                required
              />
            </div>

            <div className="div">
              <label htmlFor="">miqdorini kiriting</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="45000"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">mahsulot miqdorini tanlang </label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="1">dona</option>
                <option value="2">kg</option>
                <option value="3">litr</option>
                <option value="4"> kub metr</option>
                <option value="5"> kvadrat metr</option>
              </select>
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
            <h3 className="h3">mahsulot</h3>
            <h4>
              <span> id : </span>
              {filter?.id}
            </h4>
            <h4>
              <span> name : </span>
              {filter?.name}
            </h4>
            <h4>
              <span> description : </span>
              {filter?.description}
            </h4>
            <h4>
              <span> category : </span>
              {filter?.category}
            </h4>
            <h4>
              <span> narxi :</span> {filter?.price}
            </h4>
            <h4>
              <span> miqdori : </span>
              {filter?.quantity}
            </h4>
            <h4>
              <span> mahsulot kodi : </span>
              {filter?.prod_code}
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
          <form onSubmit={editProductSubmit} action="">
            <h3>Mahsulot Tahrirlash</h3>
            <div className="div">
              <label htmlFor="">Mahsulot nomini kiriting</label>
              <input
                value={product_name}
                onChange={(e) => setProduct_Name(e.target.value)}
                type="text"
                placeholder="kartoshka"
                required
              />
            </div>
            <div className="div">
              <label htmlFor=""> mahsulotga tavsif bering</label>
              <input
                value={product_Dect}
                onChange={(e) => setProduct_Dect(e.target.value)}
                type="text"
                placeholder="bozordan"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">kategoriyani tanlang </label>
              <select
                value={product_Category}
                onChange={(e) => {
                  setProduct_Category(e.target.value);
                }}
              >
                <option value="3">xo'jalik butumlari</option>
                <option value="2">kiyimlar </option>
                <option value="4">texnika</option>
                <option value="5"> oziq ovqat </option>
              </select>
            </div>
            <div className="div">
              <label htmlFor="">narxini kiriting</label>
              <input
                value={product_Price}
                onChange={(e) => setProduct_Price(e.target.value)}
                type="number"
                placeholder="45000"
                required
              />
            </div>

            <div className="div">
              <label htmlFor="">miqdorini kiriting</label>
              <input
                value={product_Quantity}
                onChange={(e) => setProduct_Quantity(e.target.value)}
                type="number"
                placeholder="45000"
                required
              />
            </div>
            <div className="div">
              <label htmlFor="">mahsulot miqdorini tanlang </label>
              <select
                value={product_Unit}
                onChange={(e) => setProduct_Unit(e.target.value)}
              >
                <option value="1">dona</option>
                <option value="2">kg</option>
                <option value="3">litr</option>
                <option value="4"> kub metr</option>
                <option value="5"> kvadrat metr</option>
              </select>
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

export default Product;
