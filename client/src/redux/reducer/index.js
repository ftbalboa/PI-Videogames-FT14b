import {
  SET_GENRES,
  SET_GAMES_ACT,
  SET_GAME_DETAIL,
  SET_GAME_LIST,
  TEST,
  SET_PLATFORMS,
} from "../constants";

const initialState = {
  gameList: [],
  gamesAct: [],
  gameDetail: {},
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
    case SET_GAME_DETAIL:
      return { ...state, gameDetail: action.payload };
    case TEST:
      console.log("from redux test:");
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
