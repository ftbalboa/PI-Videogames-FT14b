import React, { useEffect, useState } from "react";
import styles from "./landing.css";
import { Link } from "react-router-dom";
const axios = require("axios");

export function Landing() {
  let [backImg, changeBackImg] = useState("");
  useEffect(() => {
    loadData();
  }, []);

  let style = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `linear-gradient(black, black),url(${backImg})`,
    backgroundBlendMode: "saturation",
    color: "white",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const loadData = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/genres",
    }).then(function (response) {
      const arr = response.data;
      const ran = Math.floor(Math.random() * arr.length);
      changeBackImg(arr[ran].img);
    });
  };

  return (
    <div className="landing" style={style}>
      <span className="lanTitle">Henry PI-Videogames</span>
      <Link to="/home">
        <button className="lanButton">Ingresar</button>
      </Link>
    </div>
  );
}
