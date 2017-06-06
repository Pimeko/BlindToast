import * as types from '../types';

export default function video (
  state = {
    id: '2g811Eo7K8U'
  },
  action
) {
  switch (action.type) {
    case types.CHANGE_VIDEO:
      return {
        ...state,
        id: action.video.id
      };
    default:
      return state;
  }
}
