import React, { useEffect, useState } from "react";
import "./Reports.css";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import LoaderAnimation from "../../components/loader/LoaderAnimation";
import { FaArrowDown, FaArrowUp, FaDownload } from "react-icons/fa";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

function Reports({ toast }) {
  const token = localStorage.getItem("crmToken");
  const [data, setData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sorting, setSorting] = useState(false);

  const getReportsData = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/stats/report/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setLoader(false);
        setData(result);
        setBaseData(result);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
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
    getReportsData();
    getCategory();
  }, []);

  // sort

  const sortByName = (order = sorting) => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.product.name.toUpperCase(); // Ignore upper and lowercase
      const nameB = b.product.name.toUpperCase(); // Ignore upper and lowercase
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
  const sortPassword = (order = sorting) => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.product.prod_code.toUpperCase(); // Ignore upper and lowercase
      const nameB = b.product.prod_code.toUpperCase(); // Ignore upper and lowercase
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
  const sortUnit = (order = sorting) => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.product.unit.toUpperCase(); // Ignore upper and lowercase
      const nameB = b.product.unit.toUpperCase(); // Ignore upper and lowercase
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

  const renderArrow = () => {
    if (sorting) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };
  // sortPrice
  const sortBeginningByPrice = (products, order = sorting) => {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.beginning.price);
      const priceB = parseFloat(b.beginning.price);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };
  const sortInputByPrice = (products, order = sorting) => {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.input.price);
      const priceB = parseFloat(b.input.price);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };
  const sortOutputByPrice = (products, order = sorting) => {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.output.price);
      const priceB = parseFloat(b.output.price);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };
  const sortLastByPrice = (products, order = sorting) => {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.last.last_price);
      const priceB = parseFloat(b.last.last_price);

      if (order === true) {
        return priceA - priceB;
      } else if (order === false) {
        return priceB - priceA;
      }
    });
  };

  // sortquantity

  const sortBeginningByQuantity = (products, order = sorting) => {
    return products.sort((a, b) => {
      const quantityA = parseFloat(a.beginning.quantity);
      const quantityB = parseFloat(b.beginning.quantity);

      if (order === true) {
        return quantityA - quantityB;
      } else if (order === false) {
        return quantityB - quantityA;
      }
    });
  };

  const sortInputByQuantity = (products, order = sorting) => {
    return products.sort((a, b) => {
      const quantityA = parseFloat(a.input.quantity);
      const quantityB = parseFloat(b.input.quantity);

      if (order === true) {
        return quantityA - quantityB;
      } else if (order === false) {
        return quantityB - quantityA;
      }
    });
  };
  const sortOutputByQuantity = (products, order = sorting) => {
    return products.sort((a, b) => {
      const quantityA = parseFloat(a.output.quantity);
      const quantityB = parseFloat(b.output.quantity);

      if (order === true) {
        return quantityA - quantityB;
      } else if (order === false) {
        return quantityB - quantityA;
      }
    });
  };
  const sortLastByQuantity = (products, order = sorting) => {
    return products.sort((a, b) => {
      const quantityA = parseFloat(a.last.quantity);
      const quantityB = parseFloat(b.last.quantity);

      if (order === true) {
        return quantityA - quantityB;
      } else if (order === false) {
        return quantityB - quantityA;
      }
    });
  };
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
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzg2MDc4LCJpYXQiOjE3MjIzNTQwNzgsImp0aSI6ImIzODE4Y2UzNzVkZjQzODU5MGNlYTIzOTFmMmFkMzBkIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiJjYmVrb2RlciIsImVtYWlsIjoiIn0.-Gtnhwl8BL4bZj0USosw12wE2iWwj13dZOLvbs-a8dY"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const apiUrl = `https://omborxonacrm.pythonanywhere.com/stats/report/?start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
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
        alert("Boshlanish sanasi tugash sanasidan keyin bo`lishi mumkin emas");
      } else {
        setError("");
        // Agar startDate va endDate bir xil bo'lsa, faqat bitta kun uchun ma'lumotlarni olish
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
  return (
    <>
      <div className="reports">
        {loader ? <LoaderAnimation /> : ""}
        <div className="topbar">
          <div className="recordstext">
            <span>hisobotlar</span>
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
                return (
                  <option test={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
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
          <table border={1} width={"100%"}>
            <thead>
              <tr>
                <th rowSpan={3}>№</th>
                <th rowSpan={3}>Tekshirish</th>

                <th colSpan={2} rowSpan={2}>
                  mahsulotlar
                </th>
                <th
                  rowSpan={3}
                  onClick={() => {
                    sortByName();
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    birlik
                    {renderArrow()}
                  </span>
                </th>
                <th colSpan={2}>Qolgan</th>
                <th colSpan={4}>avg.2023 yil.</th>
                <th colSpan={2}>qolganlar</th>
              </tr>
              <tr>
                <th colSpan={2}>01.08.2023</th>
                <th colSpan={2}>Debet</th>
                <th colSpan={2}>Kredit</th>
                <th colSpan={2}>31.08.2023</th>
              </tr>
              <tr>
                <th
                  onClick={() => {
                    sortByName();
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
                    sortPassword();
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    kod
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortBeginningByPrice(data);
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
                    sortBeginningByQuantity(data);
                    setSorting(!sorting);
                  }}
                >
                  <span>
                    so'm
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortInputByPrice(data);

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
                    sortInputByQuantity(data);

                    setSorting(!sorting);
                  }}
                >
                  <span>
                    so'm
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortOutputByPrice(data);

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
                    sortOutputByQuantity(data);

                    setSorting(!sorting);
                  }}
                >
                  <span>
                    so'm
                    {renderArrow()}
                  </span>
                </th>
                <th
                  onClick={() => {
                    sortLastByPrice(data);

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
                    sortLastByQuantity(data);

                    setSorting(!sorting);
                  }}
                >
                  <span>
                    so'm
                    {renderArrow()}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr key={item.product.id}>
                    <td>{index + 1}</td>
                    <td>1</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.prod_code}</td>
                    <td>{item.product.unit}</td>
                    <td>{item.beginning.quantity}</td>
                    <td>{item.beginning.price}</td>
                    <td>{item.input.quantity}</td>
                    <td>{item.input.price}</td>
                    <td>{item.output.quantity}</td>
                    <td>{item.output.price}</td>
                    <td>{item.last.quantity}</td>
                    <td>{item.last.last_price}</td>
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

export default Reports;
