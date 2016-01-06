import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {bindActionCreators}          from "redux";
import {connect}                     from "react-redux";
import {Link}                        from "react-router";

import classNames from "./style";


const mapStateToProps = (state, otherProps) => {
  let selectedGroupId = otherProps.params.groupId;
  return {
    group: state.groups.groupsById[selectedGroupId],
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Edit extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired
  }

  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    const group = this.props.group;
    const inviteUrl = `http://localhost:9898/#/join/${group.id}?name=${group.name}&inviter=${this.props.currentUser.name}`
    return (
      <div className={classNames.groupEdit}>
        <h1>{this.props.group.name}</h1>
        <h2>Invite Users</h2>
        <div className={classNames.inviteLabel}>This link allows others to join your group "{this.props.group.name}"</div>
        <input id="#inviteUrl" readOnly value={inviteUrl}/>
      </div>
    );
  }
}
