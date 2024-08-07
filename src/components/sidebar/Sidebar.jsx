import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { IoMdHome } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import {
  MdAssignment,
  MdAutoStories,
  MdBadge,
  MdLogout,
  MdOutlineManageAccounts,
  MdPeopleAlt,
  MdTopic,
} from "react-icons/md";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FaRegFolderOpen } from "react-icons/fa";
import { BsFolderMinus, BsFolderPlus } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { LuFileInput, LuFileOutput } from "react-icons/lu";

function Sidebar({ setToken }) {
  const [control, setControl] = useState(false);
  const [info, setInfo] = useState(false);
  const [report, setReport] = useState(false);
  const [product, setProduct] = useState(false);

  const controlClick = () => {
    setControl(!control);
  };
  const infoClick = () => {
    setInfo(!info);
  };
  const reportClick = () => {
    setReport(!report);
  };
  const productClick = () => {
    setProduct(!product);
  };
  return (
    <>
      <div className="test">
        <div className="sidebar">
          <div className="top">
            <Link to={"/"}>
              <img
                src="https://t3.ftcdn.net/jpg/05/38/30/98/360_F_538309859_lrY7wR1QGZbc4Ka4LQE7t2wl623jcPG7.jpg"
                alt="BendigoSupportServices"
                className="logo"
              />
            </Link>
          </div>
          <div className="centre">
            <ul>
              {localStorage.getItem("crmPosition") == "buxgalter" ? (
                <>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={productClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <IoMdHome className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="mahsulotlar"
                      />
                      {product ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={product} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/product_input"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <LuFileInput />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulot+" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/product_output"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <LuFileOutput />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulot-" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton className="List_button" onClick={infoClick}>
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <MdAutoStories className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="ma'lumotlar"
                      />
                      {info ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={info} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/omborchi"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <MdPeopleAlt />
                            </ListItemIcon>
                            <ListItemText primary="omborchilar" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/product"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <MdAssignment />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulotlar" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={reportClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <MdTopic className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="hisobotlar"
                      />
                      {report ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/reports"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <FaRegFolderOpen />
                            </ListItemIcon>
                            <ListItemText primary="umumiy" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/reportsInput"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <BsFolderPlus />
                            </ListItemIcon>
                            <ListItemText primary="kirim" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/reportsOutput"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <BsFolderMinus />
                            </ListItemIcon>
                            <ListItemText primary="Chiqim" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={controlClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <IoSettingsSharp className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="boshqaruv"
                      />
                      {control ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={control} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/password"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <RiLockPasswordLine />
                            </ListItemIcon>
                            <ListItemText primary="Hisobot kodi" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/categories"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <TbCategory />
                            </ListItemIcon>
                            <ListItemText primary="kategoriya " />
                          </ListItemButton>
                        </NavLink>

                        <NavLink to={"/units"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <FaScaleUnbalanced />
                            </ListItemIcon>
                            <ListItemText primary="Birliklar " />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <Link to="/">
                    <li
                      onClick={() => {
                        localStorage.clear();

                        setToken(null);
                      }}
                    >
                      <MdLogout className="icon" />
                      <span>Logout</span>
                    </li>
                  </Link>
                </>
              ) : (
                ""
              )}
              {localStorage.getItem("crmPosition") == "omborchi" ? (
                <>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={productClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <IoMdHome className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="mahsulotlar"
                      />
                      {product ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={product} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/product_input"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <LuFileInput />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulot+" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/product_output"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <LuFileOutput />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulot-" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton className="List_button" onClick={infoClick}>
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <MdAutoStories className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="ma'lumotlar"
                      />
                      {info ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={info} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                     
                        <NavLink to={"/product"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <MdAssignment />
                            </ListItemIcon>
                            <ListItemText primary="Mahsulotlar" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={controlClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <IoSettingsSharp className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="boshqaruv"
                      />
                      {control ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={control} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>                       
                        <NavLink to={"/categories"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <TbCategory />
                            </ListItemIcon>
                            <ListItemText primary="kategoriya " />
                          </ListItemButton>
                        </NavLink>

                        <NavLink to={"/units"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <FaScaleUnbalanced />
                            </ListItemIcon>
                            <ListItemText primary="Birliklar " />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>
                  <Link to="/">
                    <li
                      onClick={() => {
                        localStorage.clear();

                        setToken(null);
                      }}
                    >
                      <MdLogout className="icon" />
                      <span>Logout</span>
                    </li>
                  </Link>
                </>
              ) : (
                ""
              )}
              {localStorage.getItem("crmPosition") == "reporter" ? (
                <>
                  <List
                    className="ListClick"
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      className="List_button"
                      onClick={reportClick}
                    >
                      <ListItemIcon style={{ minWidth: "auto" }}>
                        <MdTopic className="icon" />
                      </ListItemIcon>
                      <ListItemText
                        style={{}}
                        className="texts"
                        primary="hisobotlar"
                      />
                      {report ? (
                        <ExpandLess className="icon" />
                      ) : (
                        <ExpandMore className="icon" />
                      )}
                    </ListItemButton>

                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <NavLink to={"/reports"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <FaRegFolderOpen />
                            </ListItemIcon>
                            <ListItemText primary="umumiy" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/reportsInput"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <BsFolderPlus />
                            </ListItemIcon>
                            <ListItemText primary="kirim" />
                          </ListItemButton>
                        </NavLink>
                        <NavLink to={"/reportsOutput"}>
                          <ListItemButton className="btns" sx={{ pl: 4 }}>
                            <ListItemIcon className="icon">
                              <BsFolderMinus />
                            </ListItemIcon>
                            <ListItemText primary="Chiqim" />
                          </ListItemButton>
                        </NavLink>
                      </List>
                    </Collapse>
                  </List>

                  <Link to="/">
                    <li
                      onClick={() => {
                        localStorage.clear();

                        setToken(null);
                      }}
                    >
                      <MdLogout className="icon" />
                      <span>Logout</span>
                    </li>
                  </Link>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
