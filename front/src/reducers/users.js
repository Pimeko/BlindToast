import * as types from '../types';

export default function users (
  state = {
    values: []
  },
  action
) {
  switch (action.type) {
    case types.UPDATE_USER:
      if (state.values.indexOf(action.response.result) !== -1) {
        return state;
      } else {
        return {
          ...state,
          values: [
            ...state.values,
            action.response.result
          ]
        }
      }
    default:
      return state;
  }
}
