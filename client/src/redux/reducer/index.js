import { SET_TURN, TEST } from "../constants";

const initialState = {
  turn: "white",
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TURN:
      return { ...state, turn: action.payload };

    case TEST:
      console.log("from redux test:");
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
