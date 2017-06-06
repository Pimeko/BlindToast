import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Reducers
import auth from './auth';
import video from './video';
import entities from './entities';

const rootReducer = combineReducers({
  auth,
  video,
  entities,
  routing
})

export default rootReducer
