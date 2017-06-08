import * as types from '../types';

export default function video (
  state = {
    id: '2g811Eo7K8U',
    playing: true,
    waitForTheEnd: false
  },
  action
) {
  switch (action.type) {
    case types.CHANGE_VIDEO:
      return {
        ...state,
        id: action.video.id,
        playing: true,
        waitForTheEnd: false
      };
    case types.END_VIDEO:
      return {
        ...state,
        playing: false,
        waitForTheEnd: false
      };
    case types.WAIT_FOR_THE_END:
      return {
        ...state,
        waitForTheEnd: true
      };
    default:
      return state;
  }
}
