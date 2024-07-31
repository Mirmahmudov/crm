import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Signin from "./pages/signin/Signin";
import Omborchi from "./pages/omborchi/Omborchi";
import Product from "./pages/product/Product";
import Units from "./pages/units/Units";
import Categories from "./pages/categories/Categories";
import Password from "./pages/password/Password";
import Reports from "./pages/reports/Reports";
import { useState } from "react";
import Home from "./pages/home/Home";
import ReportsInput from "./pages/reportsInput/ReportsInput";
import ReportsOutput from "./pages/reportsOutput/ReportsOutput";
import ReporterPasword from "./pages/signin/ReporterPasword";
import ProductInput from "./pages/productInputOutput/ProductInput";
import ProductOutput from "./pages/productInputOutput/ProductOutput";
// toastify

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("crmToken"));
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="list">
            <Sidebar setToken={setToken} />
            <div className="listContainer">
              <Navbar />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
              />
              <div className="bodyContainer">
                <div className="backing">
                  <div className="widget">
                    {!token ? (
                      <Routes>
                        <Route
                          path="/"
                          element={<Signin toast={toast} setToken={setToken} />}
                        />
                        <Route
                          path="/password"
                          element={
                            <ReporterPasword
                              toast={toast}
                              setToken={setToken}
                            />
                          }
                        />
                      </Routes>
                    ) : (
                      <Routes>
                        <Route path="/" element={<Home toast={toast} />} />
                        <Route
                          path="/omborchi"
                          element={<Omborchi toast={toast} />}
                        />
                        <Route
                          path="/product"
                          element={<Product toast={toast} />}
                        />
                        <Route
                          path="/units"
                          element={<Units toast={toast} />}
                        />
                        <Route
                          path="/categories"
                          element={<Categories toast={toast} />}
                        />
                        <Route
                          path="/password"
                          element={<Password toast={toast} />}
                        />
                        <Route
                          path="/reports"
                          element={<Reports toast={toast} />}
                        />
                        <Route
                          path="/product_input"
                          element={<ProductInput toast={toast} />}
                        />
                        <Route
                          path="/product_output"
                          element={<ProductOutput toast={toast} />}
                        />
                        <Route
                          path="/reportsInput"
                          element={<ReportsInput />}
                        />
                        <Route
                          path="/reportsOutput"
                          element={<ReportsOutput />}
                        />
                      </Routes>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
