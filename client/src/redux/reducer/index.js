import {
  SET_GENRES,
  SET_GAMES_ACT,
  SET_GAME_LIST,
  SET_PLATFORMS,
} from "../constants";

const initialState = {
  gameList: [],
  gamesAct: [],
  genres: [],
  platforms: [],
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRES:
      return { ...state, genres: action.payload };
    case SET_PLATFORMS:
      return { ...state, platforms: action.payload };
    case SET_GAME_LIST:
      return { ...state, gameList: action.payload };
    case SET_GAMES_ACT:
      return { ...state, gamesAct: action.payload };
    default:
      return state;
  }
};
