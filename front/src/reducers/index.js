import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Reducers
import auth from './auth';
import video from './video';
import entities from './entities';
import round from './round';

const rootReducer = combineReducers({
  auth,
  video,
  entities,
  round,
  routing
})

export default rootReducer
