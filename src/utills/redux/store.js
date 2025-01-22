import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import { commonReducer } from './slice';
 

const rootReducer = combineReducers({
  globalState: commonReducer,
});

const store = createStore(
  rootReducer, // Combine all your reducers here
  applyMiddleware(thunk),
);

export default store;