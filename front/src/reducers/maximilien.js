import * as types from '../types';

export default function maximilien (
  state = {
    value: "bite"
  },
  action
) {
  switch (action.type) {
    case types.CHANGE_MAXIMILIEN:
      return {
        ...state,
        value: action.new_value
      };
    default:
      return state;
  }
}
