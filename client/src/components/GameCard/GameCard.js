import React from "react";
import styles from "./GameCard.css";

export function GameCard({game}) {
  return (
    <div className="gameCard">
        {game.name}
    </div>
  );
}