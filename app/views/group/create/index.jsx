import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {bindActionCreators}          from "redux";
import {connect}                     from "react-redux";
import {Link}                        from "react-router";

import {
  createGroup,
  addUserToGroup,
  loadGroups
} from "app/groups/actions";
import classNames from "./style";


const mapStateToProps = (state, otherProps) => {
  let selectedGroupId = otherProps.params.groupId;
  return {
    currentUser: state.auth.currentUser
  };
}

@connect(mapStateToProps)
export default class Create extends Component {
  static propTypes = {
  }

  constructor () {
    super();
    this.state = {
      name: null
    };
  }

  render () {
    const isSubmitDisabled = !this.state.name;

    return (
      <div className={classNames.groupCreate}>
        <h1>Create a new group</h1>
        <form onSubmit={this._handleSubmit.bind(this)}>

          <input value={this.state.name} onChange={this._handleNameChange.bind(this)}
            type="text" placeholder="Group Name" />

          <div>
            <input type="submit" value="Create Group" disabled={isSubmitDisabled} />
          </div>

        </form>
      </div>
    );
  }

  _handleSubmit (event) {
    event.preventDefault();
    const {dispatch} = this.props;

    dispatch(createGroup(this.state.name)).then((groupResult) => {
      if (groupResult.apiError) { console.error(groupResult.apiError); return; }

      dispatch(addUserToGroup(groupResult.apiResponse.id, this.props.currentUser.id)).then((result) => {
        if (result.apiError) { console.error(result.apiError); return; }

        dispatch(loadGroups()).then(() => {
          this.props.history.pushState(null, `/groups/${groupResult.apiResponse.id}`);
        })
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
