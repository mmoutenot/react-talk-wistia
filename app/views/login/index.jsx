import React, {Component}   from "react";
import _                    from "lodash";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";

import Login          from "app/views/login/login";
import {authenticate} from "app/auth/actions";
import {isTokenSet}   from "app/auth/localstorage";


const mapStateToProps = (state) => ({
  authenticationError: state.auth.authenticationError
});

@connect(mapStateToProps)
export default class LoginContainer extends Component {

  componentWillMount() {
    if (isTokenSet()) {
      this.props.history.pushState(null, "/home");
    }
  }

  render () {
    return (
      <Login onSubmit={this._handleSubmit.bind(this)}
        authenticationError={this.props.authenticationError}
      />
    );
  }

  _handleSubmit ({email, password}) {
    const {dispatch} = this.props;

    dispatch(authenticate(email, password)).then((result) => {
      if (result.apiError) {
        this.setState({ error: result.apiError });
        return;
      }

      this.props.history.pushState(null, "/groups");
    });
  }

}




