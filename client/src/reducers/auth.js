import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialStae = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialStae, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      //log in right away
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
