import React from "react";
import styles from "./Nav.css";
import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <div className="Nav">
      <NavLink exact to="/home" className="navTitle">
        Henry PI-Videogames :)
      </NavLink>
      <NavLink to="/home/create" className="navItem" activeClassName="active">
        Add game
      </NavLink>
    </div>
  );}