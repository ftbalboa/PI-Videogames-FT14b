import { SET_GAMES_ACT, SET_GAME_DETAIL, SET_GAME_LIST, SET_GENRES, TEST } from "../constants";

export function setGenres(payload) {
  return {
    type: SET_GENRES,
    payload: payload,
  };
}

export function setGameList(payload) {
  return {
    type: SET_GAME_LIST,
    payload: payload,
  };
}

export function setGamesAct(payload) {
  return {
    type: SET_GAMES_ACT,
    payload: payload,
  };
}

export function setGameDetail(payload) {
  return {
    type: SET_GAME_DETAIL,
    payload: payload,
  };
}

export function test(payload) {
  return {
    type: TEST,
    payload: payload,
  };
}