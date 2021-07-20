import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGamesAct } from "../../../redux/actions";
import styles from "./Filter.css";

export function Filter() {
  const [genresAct, setGenresAct] = useState([]);
  const [aocAct, setAocAct] = useState({ api: true, custom: true });
  const dispatch = useDispatch();
  const gameList = useSelector((state) => state.vg.gameList);
  const gamesAct = useSelector((state) => state.vg.gamesAct);
  const genres = useSelector((state) => state.vg.genres);

  const handleAoc = (aocType) => {
    let obj = { ...aocAct };
    obj[aocType] = !obj[aocType];
    setAocAct({ ...obj });
  };

  const handleGenres = (genreName) => {
    const index = genresAct.indexOf(genreName);
    if (index === -1) {
      setGenresAct([...genresAct, genreName]);
    } else {
      let arr = [...genresAct];
      arr.splice(index, 1);
      setGenresAct([...arr]);
    }
  };

  const handleFilter = () => {
    //filter API CUSTOM
    let arr = [...gameList];
    if (!aocAct.api) {
      arr = arr.filter((g) => typeof g.id === "string");
    }
    if (!aocAct.custom) {
      arr = arr.filter((g) => typeof g.id === "number");
    }
    // filter generes
    if(genresAct.length > 0) {
        arr = arr.filter((g) => {
            let i = 0;
            while(i < genresAct.length){
            if(!(g.genres.includes(genresAct[i]))) return false;
            i++;}
            return true;
        });
    }
    dispatch(setGamesAct([...arr]));
  };

  return (
    <div className="filters">
            Filter by genres
      <div className="genres">
        {genres.map((g) => (
          <label key={g.id}>
            <input
              type="checkbox"
              value={g.name}
              onChange={() => {
                handleGenres(g.name);
              }}
            />{" "}
            {g.name}
            <span className="pink"> || </span>
          </label>
        ))}
      </div>
      Filter by API or Custom
      <div className="apiOrDb">

        <label>
          <input
            type="checkbox"
            value="API games"
            checked={aocAct.api}
            onChange={() => {
              handleAoc("api");
            }}
          />{" "}
          API Games
        </label>
        <span className="pink"> || </span>
        <label>
          <input
            type="checkbox"
            value="Custom games"
            checked={aocAct.custom}
            onChange={() => {
              handleAoc("custom");
            }}
          />{" "}
          Custom games
        </label>
        <span className="pink"> || </span>
      </div>
      <button className="genericButton" onClick={handleFilter}>
        Go!
      </button>
    </div>
  );
}
