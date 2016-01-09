import React from "react";
import {syncReduxAndRouter} from 'redux-simple-router';
import {
  Router,
  Route,
  IndexRoute,
  Link,
  Redirect
} from "react-router";

import ApplicationContainer   from "app/views/containers/application_container";
import Video from "app/views/video";


export default function renderRoutes(store, history) {

  syncReduxAndRouter(history, store)

  return (
    <Router history={history}>
      <Route path="/" component={ApplicationContainer}>
        <IndexRoute component={Video}/>
      </Route>
    </Router>
  );
};

