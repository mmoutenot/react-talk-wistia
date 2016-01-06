import matchesAction from "app/utils/matches_action";
import * as ih       from "app/utils/immutable_helpers";

import Types                             from "./types";
import {storeToken, storeCurrentUserId}  from "./localstorage";


const initialState = ih.immutable({
  authenticating: false,
  authenticationError: null,
  currentUser: null
});

export default function reducer (state = initialState, action) {

  if (matchesAction(action, Types.AUTHENTICATE.request)) {
    state = ih.set(state, "authenticating", true);
  }

  else if (matchesAction(action, Types.AUTHENTICATE.done)) {
    const token = action.apiResponse.id;
    storeToken(token);

    state = ih.set(state, "authenticating", false);
    // state = ih.set(state, "user", action.apiResponse.user);
  }

  else if (matchesAction(action, Types.AUTHENTICATE.fail)) {
    state = ih.set(state, "authenticationError", action.apiError);
    state = ih.set(state, "authenticating", false);
  }

  else if (matchesAction(action, Types.FETCH_CURRENT_USER.done)) {
    const currentUserId = action.apiResponse.id;
    storeCurrentUserId(currentUserId);

    state = ih.set(state, "currentUser", action.apiResponse);
  }

  return state;
}
