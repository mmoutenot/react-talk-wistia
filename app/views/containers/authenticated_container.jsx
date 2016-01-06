import React, {Component}   from "react";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";

import {fetchCurrentUser} from "app/auth/actions";
import {isTokenSet}       from "app/auth/localstorage";


const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCurrentUser: fetchCurrentUser
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SecuredContentContainer extends Component {

  componentWillMount() {
    if (!isTokenSet()) {
      this.props.history.pushState(null, "/login");
    } else {
      if (!this.props.currentUser) {
        this.props.fetchCurrentUser();
      }
    }
  }

  render () {
    return this.props.children;
  }
}
