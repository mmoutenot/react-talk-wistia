import createAsyncActionsTypes from "app/utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "AUTHENTICATE",
  "FETCH_CURRENT_USER"
]);

export default {...AsyncTypes};
