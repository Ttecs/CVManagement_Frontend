import React, { useContext, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";

import { ThemeContext } from "./../../context/theme.context";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "companies" },
  { href: "/jobs", label: "jobs" },
  { href: "/candidates", label: "candidates" },
];

function NavBar() {
  const { darkMode, toogleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);

  const toogleopenMenu = () => {
    setOpen((prev) => !prev);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>resume Management</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((link, index) => (
            <li key={index} onClick={toogleopenMenu}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={toogleopenMenu} />
      </div>
      <div className="toogle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toogleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
}

export default NavBar;
