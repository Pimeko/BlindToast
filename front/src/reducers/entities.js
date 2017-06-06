import merge from 'lodash/merge';

export default function entities (
  state = {},
  action
) {
  console.log("action : ", action)
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state;
}
