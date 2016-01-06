import Types from "./types";

import {
  loadGroups as loadGroupsReq,
  createMessageForGroup as createMessageForGroupReq,
  createUserForGroup as createUserForGroupReq,
  createGroup as createGroupReq,
  addUserToGroup as addUserToGroupReq
} from "./api";

export function loadGroups () {
  return {
    type: Types.GROUPS_LOAD,
    callAPI: () => loadGroupsReq()
  };
}

export function createMessageForGroup (groupId, messageParams) {
  return {
    type: Types.MESSAGE_CREATE,
    callAPI: () => createMessageForGroupReq(groupId, messageParams)
  };
}

export function createUserForGroup (groupId, userParams) {
  return {
    type: Types.GROUP_USER_CREATE,
    callAPI: () => createUserForGroupReq(groupId, userParams)
  };
}

export function createGroup (name) {
  return {
    type: Types.GROUP_CREATE,
    callAPI: () => createGroupReq(name)
  };
}

export function addUserToGroup (groupId, userId) {
  return {
    type: Types.GROUP_USER_ADD,
    callAPI: () => addUserToGroupReq(groupId, userId)
  };
}
