import React from "react";
import {syncReduxAndRouter} from 'redux-simple-router';
import {
  Router,
  Route,
  Link,
  Redirect
} from "react-router";

import ApplicationContainer   from "app/views/containers/application_container";
import AuthenticatedContainer from "app/views/containers/authenticated_container";
import LoginContainer         from "app/views/login";

import GroupContainer from "app/views/group";
import GroupView      from "app/views/group/view";
import EditGroupView  from "app/views/group/edit";

import CreateContainer from "app/views/group/create";

import JoinContainer from "app/views/join";


export default function renderRoutes(store, history) {

  syncReduxAndRouter(history, store)

  return (
    <Router history={history}>
      <Redirect from="/" to="/groups" />

      <Route path="/" component={ApplicationContainer}>

        <Route component={AuthenticatedContainer} >
          <Route path="groups/create" component={CreateContainer}/>

          <Route path="groups" component={GroupContainer}>
            <Redirect from=":groupId" to=":groupId/view" />
            <Route path=":groupId/view" component={GroupView}/>
            <Route path=":groupId/edit" component={EditGroupView}/>
          </Route>
        </Route>

        <Route path="join/:groupId" component={JoinContainer}/>
        <Route path="login" component={LoginContainer} />

      </Route>

    </Router>
  );
};

