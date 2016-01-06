import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {bindActionCreators}          from "redux";
import {connect}                     from "react-redux";
import {Link}                        from "react-router";

import {authenticate}       from "app/auth/actions";
import {createUserForGroup} from "app/groups/actions";
import classNames from "./style";


const mapStateToProps = (state, otherProps) => {
  let selectedGroupId = otherProps.params.groupId;
  return {
  };
}

@connect(mapStateToProps)
export default class Edit extends Component {
  static propTypes = {
  }

  constructor () {
    super();
    this.state = {
      name: null,
      email: null,
      password: null
    };
  }

  render () {
    const isSubmitDisabled = !this.state.email || !this.state.password || !this.state.name;
    const inviterName = this.props.location.query.inviter;
    const groupName = this.props.location.query.name;

    return (
      <div className={classNames.joinContainer}>
        <h1>{inviterName} invited you to join their group, "{groupName}" on Speakeasy</h1>
        <p>We just need some basic information to get started</p>
        <form onSubmit={this._handleSubmit.bind(this)}>

          <input value={this.state.name} onChange={this._handleNameChange.bind(this)}
            type="text" placeholder="Name" />

          <input value={this.state.email} onChange={this._handleEmailChange.bind(this)}
            type="email" placeholder="Email" />

          <input value={this.state.password} onChange={this._handlePasswordChange.bind(this)}
            type="password" placeholder="Set Password" />

          <div>
            <input type="submit" value="Create Account" disabled={isSubmitDisabled} />
          </div>

        </form>
      </div>
    );
  }

  _handleSubmit (event) {
    const {dispatch} = this.props;
    const groupId = this.props.params.groupId;
    const userParams = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    event.preventDefault();
    dispatch(createUserForGroup(groupId, userParams)).then((result) => {
      if (result.apiError) { console.error(result.apiError); return; }

      dispatch(authenticate(userParams.email, userParams.password)).then((result) => {
        if (result.apiError) { console.error(result.apiError); return; }

        this.props.history.pushState(null, "/groups");
      });
    });
  }

  _handleNameChange (event) {
    this.setState({name: event.target.value});
  }

  _handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  _handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }
}
