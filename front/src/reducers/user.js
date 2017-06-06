import * as types from '../types';

export default function user (
  state = {
    pseudo: ''
  },
  action
) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        pseudo: action.pseudo
      };
    default:
      return state;
  }
}
