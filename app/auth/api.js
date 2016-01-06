import Api from "app/utils/api";

export function authenticate ({email, password}) {
  return Api.post({
    path: "/speakeasyUsers/login",
    body: {email: email, password: password}
  });
}

export function fetchCurrentUser () {
  return Api.get({
    path: "/speakeasyUsers/me"
  })
}
