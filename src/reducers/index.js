import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import companyReducer from './reducer_company';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  company: companyReducer
  // your reducer here
});
