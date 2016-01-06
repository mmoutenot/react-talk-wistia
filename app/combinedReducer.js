import {combineReducers} from "redux";
import {routeReducer} from 'redux-simple-router';

import authReducer from "app/auth/reducer";
import groupsReducer from "app/groups/reducer";

const rootReducer = combineReducers({
  routing: routeReducer,
  auth: authReducer,
  groups: groupsReducer
});

export default rootReducer;
