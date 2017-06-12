import * as types from '../types';

export default function auth (
  state = {
    'foundTitle' : false,
    'foundArtist' : false,
    'foundAtLeastOne' : false,
    'hasAnsweredOnce' : false
  },
  action
) {
  switch (action.type) {
    case types.ANSWER:
      return {
        'foundTitle' : action.result.foundTitle,
        'foundArtist' : action.result.foundArtist,
        'foundAtLeastOne' : action.result.foundAtLeastOne,
        'hasAnsweredOnce' : true
      };
    case types.CHANGE_VIDEO:
      return {
        'foundTitle' : false,
        'foundArtist' : false,
        'foundAtLeastOne' : false,
        'hasAnsweredOnce' : false
      };
    default:
      return state;
  }
}
