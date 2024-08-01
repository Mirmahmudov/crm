import React, { useEffect, useState } from "react";
import "./Product_Input.css";
import LoaderAnimation from "../../components/loader/LoaderAnimation";
import { Autocomplete, TextField } from "@mui/material";
import { FaXmark } from "react-icons/fa6";

function ProductInput({ toast }) {
  const token = localStorage.getItem("crmToken");
  const [loader, setLoader] = useState(false);

  //   data
  const [data, setData] = useState();
  const [baseData, setBaseData] = useState([]);

  const productData = () => {
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
        setData(result);
        setBaseData(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };
  useEffect(() => {
    productData();
  }, []);

  const [id, setId] = useState("");
  const [quantity, setQuantiy] = useState("");

  const handleChange = (event, value) => {
    if (value) {
      console.log("Tanlangan id:", value.id);
      setId(value.id);
      setModal(true);
    } else {
      console.log("Ma’lumot tanlanmagan");
    }
  };

  const inputQuantity = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      product: id,
      input_quantity: quantity,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://omborxonacrm.pythonanywhere.com/input/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success("kelgan mahsulot miqdori kiritildi!");
        setModal(false);
        productData();
        setQuantiy("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // modal

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="product_Input">
        {loader ? <LoaderAnimation /> : ""}

        <div className="topbar">
          <div className="recordstext">
            <span> kirgan Mahsulotlar</span>
          </div>
        </div>
        <div className="form">
          <div className="autocomplete-container">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={data}
              getOptionLabel={(option) =>
                `${option.name} - ${option.prod_code} - ${option.price}`
              }
              sx={{ width: 300 }}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} label="Mahsulot nomini kiriting" />
              )}
              renderOption={(props, option) => (
                <li {...props} className="autocomplete-option">
                  <div className="option-name">
                    <span className="name">Mahsulot nomi:</span>{" "}
                    <span>{option.name}</span>
                  </div>
                  <div className="option-quantity">
                    <span className="name">mahsulot kodi:</span>
                    <span> {option.prod_code}</span>
                  </div>
                  <div className="option-price">
                    <span className="name">Narxi: </span>
                    <span>{option.price}</span>
                  </div>
                </li>
              )}
            />
          </div>
        </div>
        <div className={modal ? "addinput active " : "addinput"}>
          <form onSubmit={inputQuantity} action="">
            <div className="div">
              <label htmlFor="">mahsulot id raqami</label>
              <input value={id} type="id" placeholder="55" required />
            </div>
            <div className="div">
              <label htmlFor="">Mahsulot miqdorini kiriting</label>
              <input
                value={quantity}
                onChange={(e) => {
                  setQuantiy(e.target.value);
                }}
                type="number"
                placeholder="550"
                required
              />
            </div>
            <div className="btn">
              <button
                type="button"
                onClick={() => {
                  setModal(false);
                  setQuantiy("");
                }}
                className="close"
              >
                close
              </button>
              <button>Add</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductInput;
