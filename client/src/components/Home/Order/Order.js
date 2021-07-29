import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGamesAct } from "../../../redux/actions";
import styles from "./Order.css";

export function Order() {
  const [optAct, setOptAct] = useState({
    alp: true,
    rating: false,
  });
  const [aodAct, setAodAct] = useState({
    asc: true,
    des: false,
  });
  const dispatch = useDispatch();
  const gamesAct = useSelector((state) => state.vg.gamesAct);

  const handleOpt = (optType) => {
    if (optAct[optType]) return;
    let obj = { ...optAct };
    Object.keys(obj).forEach((k) => {
      obj[k] = false;
    });
    obj[optType] = true;
    setOptAct({ ...obj });
  };

  const handleAoD = (aodType) => {
    if (aodAct[aodType]) return;
    let obj = { ...aodAct };
    Object.keys(obj).forEach((k) => {
      obj[k] = false;
    });
    obj[aodType] = true;
    setAodAct({ ...obj });
  };

  const handleOrder = () => {
    //sort Opt
    let arr = [...gamesAct];
    if (optAct.alp) {
      arr.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { ignorePunctuation: true })
      );
    }
    if (optAct.rating) {
      arr.sort((a, b) => new Date(b.released) - new Date(a.released));
    }
    if(aodAct.asc){arr = arr.reverse();}
    dispatch(setGamesAct([...arr]));
  };

  return (
    <div className="order">
            Sort
      <div className="opt">

        <label>
          <input
            type="checkbox"
            value="Alphabetically"
            checked={optAct.alp}
            onChange={() => {
              handleOpt("alp");
            }}
          />{" "}
          Alphabetically
        </label>
        <span className="pink"> || </span>
        <label>
          <input
            type="checkbox"
            value="Rating"
            checked={optAct.rating}
            onChange={() => {
              handleOpt("rating");
            }}
          />{" "}
          Rating
        </label>
        <span className="pink"> || </span>
      </div>
      <div className="ascOrDesc">
        <label>
          <input
            type="checkbox"
            value="Asc"
            checked={aodAct.asc}
            onChange={() => {
              handleAoD("asc");
            }}
          />{" "}
          Ascending
        </label>
        <span className="pink"> || </span>
        <label>
          <input
            type="checkbox"
            value="Des"
            checked={aodAct.des}
            onChange={() => {
              handleAoD("des");
            }}
          />{" "}
          Descending
        </label>
        <span className="pink"> || </span>
      </div>
      <button className="genericButton" onClick={handleOrder}>
        Go!
      </button>
    </div>
  );
}
