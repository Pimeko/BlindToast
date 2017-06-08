import * as types from '../types';

export default function users (
  state = {
    users: []
  },
  action
) {
  switch (action.type) {
    case types.UPDATE_ALL_USERS:
      return {
        users: action.response.result
      };
    default:
      return state;
  }
}
