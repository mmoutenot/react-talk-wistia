import Types from "./types";

import {
  authenticate as authenticateReq,
  fetchCurrentUser as fetchCurrentUserReq
} from "./api";


export function authenticate (email, password) {
  return {
    type: Types.AUTHENTICATE,
    callAPI: () => authenticateReq({email, password})
  }
}

export function fetchCurrentUser () {
  return {
    type: Types.FETCH_CURRENT_USER,
    callAPI: () => fetchCurrentUserReq()
  }
}
