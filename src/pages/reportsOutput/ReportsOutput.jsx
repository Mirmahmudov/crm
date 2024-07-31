import React, { useEffect, useState } from "react";
import "./ReportsOutput.css";
import { Link } from "react-router-dom";
import LoaderAnimation from "../../components/loader/LoaderAnimation";
import { FaArrowDown, FaArrowUp, FaDownload } from "react-icons/fa";

function ReportsOutput() {
  const token = localStorage.getItem("crmToken");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [baseData, setBaseData] = useState([]);
  const [category, setCategory] = useState([]);
  const getOutputData = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://omborxonacrm.pythonanywhere.com/stats/outputs/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setBaseData(result);

        setLoader(false);
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
        console.log(result);
        setCategory(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getOutputData();
    getCategory();
  }, []);

  const categoryFilter = (category) => {
    console.log(baseData);
    if (category == "barchasi") {
      setData(baseData);
    } else {
      const filterData = baseData.filter((item) => {
        console.log(item);
        return item.product.category === category;
      });
      setData(filterData);
    }
  };

  // filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Agar startDate bo'sh bo'lsa, barcha ma'lumotlarni ko'rsatish
    if (!startDate && !endDate) {
      setData(baseData);
      return;
    }

    // Agar startDate bo'lsa, uning qiymatini olish
    const start = startDate ? new Date(startDate) : new Date(0);
    let end = endDate ? new Date(endDate) : new Date();

    // Agar endDate bo'sh bo'lsa, uni bugungi sana bilan to'ldirish
    if (!endDate) {
      end = new Date();
      setEndDate(end.toISOString().split("T")[0]);
    }

    // Agar startDate endDate'dan katta bo'lsa, alert ko'rsatish
    if (start > end) {
      alert("Boshlanish sanasi tugash sanasidan keyin bo'lishi mumkin emas!");
      setStartDate(""); // Bo'shatish yoki avvalgi qiymatni tiklash
      setEndDate("");
      setData(baseData);
      return;
    }

    // Filtrlash
    const filtered = baseData.filter((item) => {
      const createdAt = new Date(item.created_at);
      return createdAt >= start && createdAt <= end;
    });

    setData(filtered);
  }, [startDate, endDate]);

  // sort
  const [sorting, setSorting] = useState(false);

  const renderArrow = () => {
    if (sorting) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const sortByName = (key, order = sorting) => {
    console.log(key);
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
      <div className="reportsOutputs">
        <div className="topbar">
          <div className="recordstext">
            <span>hisobtlarni kiritish</span>
          </div>
          <div className="sort">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                const newStartDate = e.target.value;
                const start = new Date(newStartDate);
                const end = endDate ? new Date(endDate) : new Date();

                // Agar yangi startDate endDate'dan katta bo'lsa, alert ko'rsatish
                if (start > end) {
                  alert(
                    "Boshlanish sanasi tugash sanasidan keyin bo'lishi mumkin emas!"
                  );
                  return;
                }

                setStartDate(newStartDate);
              }}
              placeholder="Boshlanish sanasi"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                const newEndDate = e.target.value;
                const start = startDate ? new Date(startDate) : new Date();
                const end = newEndDate ? new Date(newEndDate) : new Date();

                // Agar endDate startDate'dan kichik bo'lsa, alert ko'rsatish
                if (start > end) {
                  alert(
                    "Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas!"
                  );
                  return;
                }

                setEndDate(newEndDate);
              }}
              placeholder="Tugash sanasi"
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
                    sortByQuantiy(data, "output_quantity");
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
              {data?.map((item, index) => {
                // console.log(item);
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.product.name}</td>
                    <td>{item.product.prod_code}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{item.product.price}</td>
                    <td>{item.output_quantity}</td>
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

export default ReportsOutput;
