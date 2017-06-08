import * as types from '../types';

export default function round (
  state = {
    'currentRound' : -1,
    'nbRounds' : -1
  },
  action
) {
  switch (action.type) {
    case types.UPDATE_ROUND:
      return {
        ...state,
        'currentRound' : action.round.currentRound,
        'nbRounds' : action.round.nbRounds
      };
    default:
      return state;
  }
}
