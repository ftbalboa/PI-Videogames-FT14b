import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGameList, setGamesAct, setGenres } from "../../redux/actions";
import { GameCard } from "../GameCard/GameCard";
import styles from "./Home.css";
const axios = require("axios");

export function Home() {
  const [search, setSearch] = useState("");
  const [genresAct, setGenresAct] = useState([]);
  const [aocAct, setAocAct] = useState({ api: true, custom: true });
  const dispatch = useDispatch();
  const handleInputChange = function (e) {
    setSearch(e.target.value);
  };
  const gameList = useSelector((state) => state.vg.gameList);
  const gamesAct = useSelector((state) => state.vg.gamesAct);
  const genres = useSelector((state) => state.vg.genres);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/videogames",
    }).then(function (response) {
      dispatch(setGameList(response.data));
      dispatch(setGamesAct(response.data));
    });
    axios({
      method: "get",
      url: "http://localhost:3001/genres",
    }).then(function (response) {
      dispatch(setGenres(response.data));
    });
  };

  const apiSearch = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/videogames?name=${search}`,
    }).then(function (response) {
      dispatch(setGamesAct(response.data));
    });
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

  const handleAoc = (aocType) => {
    let obj = {...aocAct};
    obj[aocType] = !obj[aocType]
    setAocAct({...obj});
  };

  return (
    <div className="Home">
      <div className="searchBar">
        <input
          className="searchInput"
          type="text"
          name="username"
          value={search}
          onChange={handleInputChange}
        />
        <button className="searchButton" onClick={apiSearch}>
          {" "}
          Search{" "}
        </button>
      </div>
      <div className="filters">
        <div className="genres">
          Filtrar por genero:
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
            </label>
          ))}
        </div>
        <div className="apiOrDb">
          Habilitar API o Custom:
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
        </div>
      </div>
      <div className="order">
        {/*alfb or rank*/}
        {/*asc or desc*/}
      </div>
      <div className="gameCards">
        {gamesAct.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
      <div className="page"></div>
    </div>
  );
}

//input de busqueda + boton

//filtros

// listado de juegos

// paginado
