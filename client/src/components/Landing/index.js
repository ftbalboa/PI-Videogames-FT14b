import React, { useEffect, useState } from "react";
import styles from "./landing.css";
import { Link } from "react-router-dom";
const axios = require("axios");

export function Landing() {
  let [backImg, changeBackImg] = useState("");
  useEffect(() => {
    loadData();
  }, []);

  let style = `
    .landing{
    width: 100vw;
    height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;}
    .landing::before{
      content: "";
      background-image: url(${backImg});
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      filter: brightness(20%);
    }
  `;

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
    <div className="landing">
    <style>{style}</style>
      <span className="lanTitle">Henry PI-Videogames</span>
      <Link to="/home">
        <button className="lanButton">Ingresar</button>
      </Link>
    </div>
  );
}
