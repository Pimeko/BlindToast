import * as types from '../types';

export default function test (
  state = {
    count: 40
  },
  action
) {
  switch (action.type) {
    case types.TEST_INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}
