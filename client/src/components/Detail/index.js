import React, { useEffect, useState } from "react";
import styles from "./Detail.css";
const axios = require("axios");

export function Detail({ gameId }) {
  let [loading, setLoading] = useState(true);
  let [gameData, setGameData] = useState({});
  const loadData = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/videogame/${gameId}`,
    }).then(function (response) {
      setLoading(false);
      setGameData(response.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);


  const printGame = () => {
    if (gameData.id) {
      return (
        <div className="detailGame">
          <div className="detailTitleContainer">
            <h1>{gameData.name}</h1>
            <h5 className="detailRating">★{gameData.rating}</h5>
          </div>
          <img src={gameData.img} className="detailImg"></img>
          <div className="detailCon">
            <span className="detailSubTitle">Released</span>
            {gameData.released}
          </div>
          <div className="detailCon">
          <span className="detailSubTitle">Genres</span>
            {gameData.genres.map(
              (g, index) =>
                `${g}${index < gameData.genres.length - 1 ? " / " : ""}`
            )}
          </div>
          <div className="detailCon">
          <span className="detailSubTitle">Platforms</span>
            {gameData.platforms.map(
              (p, index) =>
                `${p}${index < gameData.platforms.length - 1 ? " / " : ""}`
            )}
          </div>
          <span className="detailTitDesc">Description</span>
          <div
            className="detailDescription"
            dangerouslySetInnerHTML={{ __html: gameData.description }}
          />
        </div>
      );
    }
  };

  return <div className="Detail">{loading ? "Loading" : printGame()}</div>;
}
