import Api from "app/utils/api";

export function loadMedia () {
  return Api.get({
    path: "medias.json"
  });
}
