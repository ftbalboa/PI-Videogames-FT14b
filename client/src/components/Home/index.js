import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGameList, setGamesAct, setGenres } from "../../redux/actions";
import { GameCard } from "../GameCard/GameCard";
import styles from "./Home.css";
const axios = require("axios");
const gamesPerPage = 15;

export function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
    if (gameList.length < 1) {
      setLoading(true);
      axios({
        method: "get",
        url: "http://localhost:3001/videogames",
      }).then(function (response) {
        dispatch(setGameList(response.data));
        dispatch(setGamesAct(response.data));
        setLoading(false);
      });
    }
    genres.length < 1 &&
      axios({
        method: "get",
        url: "http://localhost:3001/genres",
      }).then(function (response) {
        dispatch(setGenres(response.data));
      });
  };

  const apiSearch = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `http://localhost:3001/videogames?name=${search}`,
    }).then(function (response) {
      dispatch(setGamesAct(response.data));
      setLoading(false);
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


  const handleOrder = () => {}

  const handleFilter = () => {}

  const handleAoc = (aocType) => {
    let obj = { ...aocAct };
    obj[aocType] = !obj[aocType];
    setAocAct({ ...obj });
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
        <button className="filterButton" onClick={handleFilter}>Filter</button>
      </div>
      <hr/>
      <div className="order">
        {/*alfb or rank*/}
        {/*asc or desc*/}
        <button className="orderButton" onClick={handleOrder}>Order</button>
      </div>
      {loading ? "Loading" : ""}

      <div className="gameCards">
        {gamesAct.map((g, index) => {
          if (index >= gamesPerPage * (page - 1) && index < gamesPerPage * page)
            return <GameCard key={g.id} game={g} />;
        })}
      </div>

      <div className="page">
        {page > 1 ? (
          <span
            className="arrow"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {" "}
            {"<"}{" "}
          </span>
        ) : (
          ""
        )}
        {page}
        {page < gamesAct.length / gamesPerPage ? (
          <span
            className="arrow"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {" "}
            {">"}{" "}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
