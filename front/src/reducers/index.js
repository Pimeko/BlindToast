import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Reducers
import user from './user';
import video from './video';

const rootReducer = combineReducers({
  user,
  video,
  routing
})

export default rootReducer
