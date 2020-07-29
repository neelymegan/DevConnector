import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// just pertain to alert
// alerts are objects in array
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      //payload just the id here
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
