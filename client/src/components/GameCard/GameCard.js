import React from "react";
import styles from "./GameCard.css";
import { Link } from "react-router-dom";

export function GameCard({ game }) {
  return (
    <div className="gameCard">
      <Link to={`home/detail/${game.id}`} className="gameMinT">
        {game.name}
      </Link>
      <img className="gameMinImg" src={game.img}></img>
      <div className="genresCard">
        {game.genres.map(
          (g, index) => `${g}${index < game.genres.length - 1 ? " / " : ""}`
        )}
      </div>
    </div>
  );
}
