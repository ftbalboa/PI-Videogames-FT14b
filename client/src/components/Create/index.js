import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlatforms, setGenres } from "../../redux/actions";
import styles from "./Create.css";
const axios = require("axios");

export function Create() {
  const genres = useSelector((state) => state.vg.genres);
  const platforms = useSelector((state) => state.vg.platforms);
  const dispatch = useDispatch();
  const [genresAct, setGenresAct] = useState([]);
  const [platformsAct, setPlatformsAct] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: genresAct,
    platforms: platformsAct,
    img: "",
  });
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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
  const handlePlatforms = (pName) => {
    const index = platformsAct.indexOf(pName);
    if (index === -1) {
      setPlatformsAct([...platformsAct, pName]);
    } else {
      let arr = [...platformsAct];
      arr.splice(index, 1);
      setPlatformsAct([...arr]);
    }
  };
  const loadData = () => {
    platforms.length < 1 && axios({
      method: "get",
      url: "http://localhost:3001/platforms",
    }).then(function (response) {
      dispatch(setPlatforms(response.data));
    });
    genres.length < 1 && axios({
      method: "get",
      url: "http://localhost:3001/genres",
    }).then(function (response) {
      dispatch(setGenres(response.data));
    });
  };
  useEffect(() => {
    loadData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (platformsAct.length < 1){
      alert("Select at least one platform")
    }
    else {
      sendGame();
    }
  };

  const sendGame = () => {
    let payload = {
      name: input.name,
      description: input.description,
      platforms: platformsAct,
    };
    if(genresAct.length > 0){payload['genres'] = genresAct}
    if(input.rating.length !== 0){payload['rating'] = input.rating}
    if(input.released.length !== 0){payload['released'] = input.released}
    if(input.img.length !== 0){payload['img'] = input.img}
    axios.post("http://localhost:3001/videogame", payload).then(
      ()=>{
        alert("Success");
        setInput({
          name: "",
          description: "",
          released: "",
          rating: "",
          genres: genresAct,
          platforms: platformsAct,
          img: "",
        });
    }
    );
  };

  return (
    <div className="Create">
      <span className="createTitle">Add game to database</span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="defForm">
          <label>Name*:</label>
          <input
            required="required"
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            className="textInput"
          />
        </div>
        <hr />
        <span className="createSubTitle">Genres</span>
        <div className="cbCreate">
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
        <hr />
        <span className="createSubTitle">Platforms</span>
        <div className="cbCreate">
          {platforms.map((p, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={p.name}
                onChange={() => {
                  handlePlatforms(p.name);
                }}
              />{" "}
              {p.name}
              <span className="pink"> || </span>
            </label>
          ))}
        </div>
        <hr />
        <div className="defForm">
          <label>Description*:</label>
          <textarea
            type="text"
            name="description"
            required="required"
            value={input.description}
            className="textAreaInput"
            onChange={handleInputChange}
          />
        </div>
        <div className="defForm">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            step="0.01"
            className="textInput"
            value={input.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="defForm">
          <label>Image url:</label>
          <input
            type="text"
            name="img"
            value={input.img}
            className="textInput"
            onChange={handleInputChange}
          />
        </div>
        <div className="defForm">
          <label>Released:</label>
          <input
            type="date"
            name="released"
            value={input.released}
            className="textInput"
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" name="submit" className="submitButton" value="Add to database"/>
      </form>
    </div>
  );
}
