import _ from "lodash";

import matchesAction from "app/utils/matches_action";
import * as ih       from "app/utils/immutable_helpers";
import Types         from "./types";


const initialState = ih.immutable({
  mediaById: {}
});

export default function reducer (state = initialState, action) {
  if (matchesAction(action, Types.MEDIAS_FETCH.done)) {
    state = ih.set(state, 'mediaById', _.indexBy(action.apiResponse, 'id'));

  }

  return state;
}

