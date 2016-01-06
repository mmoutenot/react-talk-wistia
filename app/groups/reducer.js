import _ from "lodash";

import matchesAction from "app/utils/matches_action";
import * as ih       from "app/utils/immutable_helpers";

import Types         from "./types";


const initialState = ih.immutable({
  error: null,
  isLoading: false,
  isLoaded: false,
  isCreatingMessage: false,
  groupsById: {}
});

export default function reducer (state = initialState, action) {

  if (matchesAction(action, Types.GROUPS_LOAD.request)) {
    state = ih.set(state, "isLoading", true);
  }

  else if (matchesAction(action, Types.GROUPS_LOAD.done)) {
    state = ih.merge(state, {
      groupsById: _.indexBy(action.apiResponse, 'id'),
      isLoading: false,
      isLoaded: true
    });
  }

  else if (matchesAction(action, Types.GROUPS_LOAD.fail)) {
    state = ih.merge(state, {
      isLoading: false,
      isLoaded: false,
      error: action.apiError
    });
  }

  else if (matchesAction(action, Types.MESSAGE_CREATE.request)) {
    state = ih.set(state, "isCreatingMessage", true);
  }

  else if (matchesAction(action, Types.MESSAGE_CREATE.done)) {
    let groupId = action.apiResponse.groupId;
    let group = state.groupsById[groupId];

    let mutableGroupsById = state.groupsById.asMutable();
    let mutableMessages = state.groupsById[groupId].messages.asMutable();

    mutableMessages.push(action.apiResponse);
    group = ih.set(group, 'messages', mutableMessages);

    mutableGroupsById[groupId] = group;
    state = ih.set(state, 'groupsById', mutableGroupsById);
    state = ih.set(state, "isCreatingMessage", false);
  }

  else if (matchesAction(action, Types.GROUP_CREATE.done)) {
    let groupId = action.apiResponse.id;
    let mutableGroupsById = state.groupsById.asMutable();

    mutableGroupsById[groupId] = action.apiResponse;
    state = ih.set(state, 'groupsById', mutableGroupsById);
  }

  return state;
}
