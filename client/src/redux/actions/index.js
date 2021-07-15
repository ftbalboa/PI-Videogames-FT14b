import { SET_TURN } from "../constants";

export function setTurn(status) {
  return {
    type: SET_TURN,
    payload: status,
  };
}

export function test(payload) {
  return {
    type: TEST,
    payload: payload,
  };
}