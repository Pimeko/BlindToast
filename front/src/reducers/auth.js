import * as types from '../types';

export default function auth (
  state = {
    userId: ''
  },
  action
) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        userId: action.response.result
      };
    default:
      return state;
  }
}
