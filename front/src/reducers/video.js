import * as types from '../types';

export default function video (
  state = {
    id: '',
    playing: true,
    waitForTheEnd: false,
    playlist: []
  },
  action
) {
  switch (action.type) {
    case types.CHANGE_VIDEO:
      console.log("CHANGE VIDEO ------------------------------ ", action)
      return {
        ...state,
        id: state.id === '' ? action.video.id : state.id,
        playing: true,
        waitForTheEnd: false
      };
    case types.END_VIDEO:
      return {
        ...state,
        id: action.videosInfo.newVideoId,
        playing: false,
        waitForTheEnd: false,
        playlist: [
          action.videosInfo.prevVideo,
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
