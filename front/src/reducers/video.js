import * as types from '../types';

export default function video (
  state = {
    id: '2g811Eo7K8U',
    playing: true,
    waitForTheEnd: false,
    playlist: []
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
        waitForTheEnd: false,
        playlist: [
          action.currVideo,
          ...state.playlist
        ]
      };
    case types.WAIT_FOR_THE_END:
      return {
        ...state,
        waitForTheEnd: true
      };
    case types.RESET_PLAYLIST:
      return {
        ...state,
        playlist: []
      };
    default:
      return state;
  }
}
