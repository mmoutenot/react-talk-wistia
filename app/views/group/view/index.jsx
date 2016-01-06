import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {bindActionCreators}          from "redux";
import {connect}                     from "react-redux";
import {Link}                        from "react-router";

import {getTodayString, getCreatedAtString} from "app/utils/moment_helpers";
import Day from "./day";
import Compose from "./compose";
import classNames from "./style";


const mapStateToProps = (state, otherProps) => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupView extends Component {
  static propTypes = {
    messagesByDay: PropTypes.object,
    selectedGroup: PropTypes.object,
    groupsById: PropTypes.object,
    currentUser: PropTypes.object
  }

  constructor () {
    super();
    this.state = {
      didCurrentUserComposeToday: false
    };
  }

  setInnerView (props) {
    let todaysMessages = props.messagesByDay[getTodayString()];
    let didCurrentUserComposeToday = !!_.find(todaysMessages, (m) => {
      return m.speakeasyUserId == props.currentUser.id;
    });
    if (this.state.didCurrentUserComposeToday != didCurrentUserComposeToday) {
      this.setState({didCurrentUserComposeToday: didCurrentUserComposeToday});
    }
  }

  componentWillMount () {
    this.setInnerView(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.setInnerView(nextProps);
  }

  renderGroupList () {
    const selectedGroupId = this.props.params.groupId;
    const groups = _.values(this.props.groupsById);
    const createGroupUrl = "/groups/create";

    return (
      <div>
        <div className={classNames.groupsLabel}>
          {_.size(this.props.groupsById)} Groups
          [<Link to={createGroupUrl}>Create Group</Link>]
        </div>
        {_.map(groups, function(group, key) {
          let isSelected = group.id == selectedGroupId;
          let className = isSelected ? classNames.selectedGroup : classNames.group;
          let groupUrl = `/groups/${group.id}`;

          let selectedSpan = null;
          if (isSelected) {
            let inviteUrl = `/groups/${group.id}/edit`;
            selectedSpan = (
              <span>
                [
                <Link to={inviteUrl} >
                  invite
                </Link>
                ]
              </span>
            );
          }

          return (
            <div className={className} key={key}>
              <Link to={groupUrl}>
                <h1>
                  {group.name}
                </h1>
              </Link>
              {selectedSpan}
            </div>
          );
        })}
      </div>
    );
  }

  renderCompose () {
    return (
      <Compose groupId={this.props.params.groupId} />
    );
  }

  renderGroupContent () {
    let groupUsersById = _.indexBy(this.props.selectedGroup.speakeasyUsers, 'id');

    let renderedMessages = null;
    if (this.props.messagesByDay) {
      renderedMessages = _.chain(this.props.messagesByDay)
        .keys()
        .reverse()
        .map((day) => {
          let messages = this.props.messagesByDay[day];
          return <Day key={day} day={day} messages={messages} usersById={groupUsersById}/>;
        })
        .value();
    }

    return (
      <div>
        {renderedMessages}
      </div>
    );
  }

  render () {
    let content = this.state.didCurrentUserComposeToday ?
      this.renderGroupContent() :
      this.renderCompose();

    return (
      <div className={classNames.groupView}>
        {this.renderGroupList()}
        <hr/>
        {content}
      </div>
    );
  }
}
