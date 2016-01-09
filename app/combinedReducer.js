import {combineReducers} from "redux";
import {routeReducer} from "redux-simple-router";

import mediaReducer from "app/media/reducer";

const rootReducer = combineReducers({
  routing: routeReducer,
  media: mediaReducer
});

export default rootReducer;
