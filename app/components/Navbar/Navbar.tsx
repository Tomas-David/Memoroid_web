"use client";
import { useState } from "react";
import classes from "./Navbar.module.css";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className={classes.navbar}>
      <h1 className={classes.brand} >Memoroid</h1>
      <button onClick={() => {setIsOpen(!isOpen)}} className={classes.ham}>
        <span
  className={classes.ham__item}
  style={{
    transform: isOpen
      ? "translate(-50%, -50%) rotate(45deg)"
      : "translate(-50%, -25%) rotate(0)",
    top: isOpen ? "50%" : "25%",
  }}
></span>

<span
  className={classes.ham__item}
  style={{
    opacity: isOpen ? 0 : 1,
  }}
></span>

<span
  className={classes.ham__item}
  style={{
    transform: isOpen
      ? "translate(-50%, -50%) rotate(-45deg)"
      : "translate(-50%, -75%) rotate(0)",
    top: isOpen ? "50%" : "75%",
  }}
></span>

      </button>
    </nav>
  );
};

export default NavBar;
