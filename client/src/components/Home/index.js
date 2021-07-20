import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGameList, setGamesAct, setGenres } from "../../redux/actions";
import { GameCard } from "../GameCard/GameCard";
import { Filter } from "./Filter/Filter";
import { Order } from "./Order/Order";
import styles from "./Home.css";
const axios = require("axios");
const gamesPerPage = 15;

export function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
    if (genres.length < 1) {
      axios({
        method: "get",
        url: "http://localhost:3001/genres",
      }).then(function (response) {
        dispatch(setGenres(response.data));
      });
    }
  };

  const apiSearch = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `http://localhost:3001/videogames?name=${search}`,
    }).then(function (response) {
      dispatch(setGameList(response.data));
      dispatch(setGamesAct(response.data));
      setLoading(false);
    });
  };

  const searchBar = () => (
    <div className="searchBar">
      Search games:
      <input
        className="searchInput"
        type="text"
        name="username"
        value={search}
        onChange={handleInputChange}
      />
      <button className="genericButton" onClick={apiSearch}>
        {" "}
        Search{" "}
      </button>
    </div>
  );

  const gameCards = () => (
    <div className="gameCards">
      {gamesAct.map((g, index) => {
        if (index >= gamesPerPage * (page - 1) && index < gamesPerPage * page)
          return <GameCard key={g.id} game={g} />;
      })}
    </div>
  );

  const pagePrint = () => (
    <div className="page">
      {page > 1 ? (
        <span
          className="arrow"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {"<<"}
        </span>
      ) : (
        <span className="arrow"></span>
      )}
      {page}
      {page < gamesAct.length / gamesPerPage ? (
        <span
          className="arrow"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {">>"}
        </span>
      ) : (
        <span className="arrow"></span>
      )}
    </div>
  );

  return (
    <div className="Home">

      {searchBar()}
      <hr />
      <Filter />
      <hr />
      <Order />
      <hr />
      {loading ? "Loading" : `${gamesAct.length} games found`}
      {gameCards()}
      {pagePrint()}
    </div>
  );
}
