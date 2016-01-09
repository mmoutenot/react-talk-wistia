import Types from "./types";

import {
  loadMedia as loadMediaReq,
} from "./api";

export function loadMedia () {
  return {
    type: Types.MEDIAS_FETCH,
    callAPI: () => loadMediaReq()
  };
}
