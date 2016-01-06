import createAsyncActionsTypes from "app/utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "GROUPS_LOAD",
  "MESSAGE_CREATE",
  "GROUP_USER_CREATE",
  "GROUP_CREATE",
  "GROUP_USER_ADD"
]);

export default {...AsyncTypes};
