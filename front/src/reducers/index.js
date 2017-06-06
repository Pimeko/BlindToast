import test from './test';
import maximilien from './maximilien';
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  test,
  maximilien,
  routing
})

export default rootReducer
