import Api from "app/utils/api";

export function loadGroups () {
  let filters = 'filter[include]=messages&filter[include]=speakeasyUsers';

  return Api.get({
    path: "/groups?" + filters
  });
}

export function createMessageForGroup (groupId, messageParams) {
  return Api.post({
    path: `/groups/${groupId}/messages`,
    body: messageParams
  });
}

export function createUserForGroup (groupId, userParams) {
  return Api.post({
    path: `/groups/${groupId}/speakeasyUsers`,
    body: userParams
  });
}

export function createGroup (name) {
  return Api.post({
    path: "/groups",
    body: {name}
  });
}

export function addUserToGroup (groupId, userId) {
  return Api.put({
    path: `/groups/${groupId}/speakeasyUsers/rel/${userId}`
  });
}
