import React, { useEffect, useState } from "react";
import "./ReportsInput.css";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaArrowDown, FaArrowUp, FaDownload, FaRegEye } from "react-icons/fa";
import LoaderAnimation from "../../components/loader/LoaderAnimation";

function ReportsInput({ toast }) {
  const token = localStorage.getItem("crmToken");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [baseData, setBaseData] = useState([]);
  const [category, setCategory] = useState([]);

  const getinputData = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/stats/inputs/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result);
        setLoader(false);
        setBaseData(result);
      })
      .catch((error) => console.error(error));
  };
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
        // console.log(result);
        setCategory(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getinputData();
    getCategory();
  }, []);

  // Filter

  const categoryFilter = (category) => {
    if (category == "barchasi") {
      setData(baseData);
    } else {
      const filterData = baseData.filter((item) => {
        return item.product.category === category;
      });
      setData(filterData);
    }
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const fetchData = async (startDate, endDate) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const apiUrl = `
https://omborxonacrm.pythonanywhere.com/stats/inputs/?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl, requestOptions);
      console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error fetching the data:", error);
      setData(null);
      setError("Error fetching the data");
    }
  };

  useEffect(() => {
    if (startDate) {
      const today = new Date().toISOString().split("T")[0];
      const endDateOrToday = endDate || today;
      if (new Date(startDate) > new Date(endDateOrToday)) {
        setError(
          "Start date cannot be after end date. Setting end date to today."
        );
        setEndDate(today);
        setStartDate(today);
        toast.error(
          "Boshlanish sanasi tugash sanasidan keyin bo`lishi mumkin emas !"
        );
      } else {
        setError("");
        if (startDate === endDateOrToday) {
          fetchData(startDate, startDate);
        } else {
          fetchData(startDate, endDateOrToday);
        }
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && !endDate) {
      const today = new Date().toISOString().split("T")[0];
      setEndDate(today);
    }
  }, [startDate]);

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
      const nameA = a.product[key].toUpperCase(); // Ignore upper and lowercase
      const nameB = b.product[key].toUpperCase(); // Ignore upper and lowercase
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

  const sortByKey = (data, key, order = sorting) => {
    return data.sort((a, b) => {
      const priceA = parseFloat(a.product[key]);
      const priceB = parseFloat(b.product[key]);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };
  const sortByQuantiy = (data, key, order = sorting) => {
    return data.sort((a, b) => {
      const priceA = parseFloat(a[key]);
      const priceB = parseFloat(b[key]);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };

  return (
    <>
      {loader ? <LoaderAnimation /> : ""}
      <div className="reportsInput">
        <div className="topbar">
          <div className="recordstext">
            <span>hisobotlarni kiritish</span>
          </div>
          <div className="sort">
            <input
              type="date"
              id="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              id="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <select
              onChange={(e) => {
                categoryFilter(e.target.value);
              }}
              name=""
              id=""
            >
              <option value="barchasi">Barchasi</option>
              {category?.map((item) => {
                return <option key={item.id}>{item.name}</option>;
              })}
            </select>
            <Link to="">
              <div className="addicon">
                <FaDownload />
              </div>
            </Link>
          </div>
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
                    mahsulot_nomi
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByKey(data, "prod_code");
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    kodi
                    {renderArrow()}
                  </span>
                </th>
                <th>sana</th>
                <th
                  onClick={() => {
                    sortByKey(data, "price");
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
                    sortByQuantiy(data, "input_quantity");
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    miqdori
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortByName("unit");
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    birligi
                    {renderArrow()}
                  </span>
                </th>
                <th>summasi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.prod_code}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{item.product.price}</td>
                    <td>{item.input_quantity}</td>
                    <td>{item.product.unit}</td>
                    <td>{item.product.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReportsInput;
