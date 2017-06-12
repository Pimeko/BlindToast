import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Reducers
import auth from './auth';
import video from './video';
import entities from './entities';
import round from './round';
import users from './users';
import answer from './answer';

const rootReducer = combineReducers({
  auth,
  video,
  entities,
  round,
  users,
  answer,
  routing
})

export default rootReducer
