import React from "react";
import styles from "./GameCard.css";
import { Link } from "react-router-dom";

export function GameCard({ game }) {

  const mapGenres = () => {
    let arr = game.genres.map((g, index)=>{
      if(index < 4){
      return `${g}${index < game.genres.length - 1 ? " / " : ""}`}
      else{ 
        if (index === 4) {return `+${game.genres.length - index + 1}`}
        return ""}
    })
    return arr.join("");
  }

  return (
    <div className="gameCard">
      <Link to={`home/detail/${game.id}`} className="gameMinT">
        {game.name}
      </Link>
      <img className="gameMinImg" src={game.img}></img>
      <div className="genresCard">
        {mapGenres()}
      </div>
    </div>
  );
}
