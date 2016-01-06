import _                    from "lodash";
import React, {Component}   from "react";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";
import {pushPath}           from "redux-simple-router";

import {getTodayString, getCreatedAtString} from "app/utils/moment_helpers";
import {loadGroups} from "app/groups/actions";
import classNames from "./style";


const mapStateToProps = (state, otherProps) => {
  let messagesByDay = {};
  let selectedGroupId = otherProps.params.groupId;
  let selectedGroup = null;

  if (state.groups.isLoaded && selectedGroupId) {
    selectedGroup = state.groups.groupsById[selectedGroupId];
    messagesByDay  = _.chain(selectedGroup.messages)
      .sortBy((message) => message.isMine)
      .groupBy((message) => getCreatedAtString(message.createdAt))
      .value();
  }

  return {
    isLoaded: state.groups.isLoaded,
    isLoading: state.groups.isLoading,
    groupsById: state.groups.groupsById,
    messagesByDay: messagesByDay,
    selectedGroup: selectedGroup,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    load: loadGroups,
    pushPath
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupContainer extends Component {

  componentWillMount() {
    if (!this.props.isLoaded) {
      this.props.load()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded && !nextProps.params.groupId) {
      let defaultGroupId = _.values(nextProps.groupsById)[0].id;
      nextProps.pushPath("groups/" + defaultGroupId);
    }
  }

  renderLoading (){
    return (
      <div className={classNames.groupContainer}>
        <h1>Loading</h1>
      </div>
    );
  }

  renderChildren () {
    return (
      <div className={classNames.groupContainer}>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }

  render () {
    if (!this.props.isLoaded || !this.props.children) {
      return this.renderLoading();
    } else {
      return this.renderChildren();
    }
  }
}
