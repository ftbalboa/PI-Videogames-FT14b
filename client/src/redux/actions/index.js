import { SET_GAMES_ACT, SET_GAME_LIST, SET_GENRES, SET_PLATFORMS} from "../constants";

export function setGenres(payload) {
  return {
    type: SET_GENRES,
    payload: payload,
  };
}

export function setPlatforms(payload) {
  return {
    type: SET_PLATFORMS,
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