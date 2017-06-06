import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Reducers
import test from './test';
import maximilien from './maximilien';
import user from './user';

const rootReducer = combineReducers({
  test,
  maximilien,
  user,
  routing
})

export default rootReducer
