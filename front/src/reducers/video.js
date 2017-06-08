import * as types from '../types';

export default function video (
  state = {
    id: '2g811Eo7K8U',
    playing: true
  },
  action
) {
  switch (action.type) {
    case types.CHANGE_VIDEO:
      return {
        ...state,
        id: action.video.id,
        playing: true
      };
    case types.END_VIDEO:
      return {
        ...state,
        playing: false
      };
    default:
      return state;
  }
}
