import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {bindActionCreators}          from "redux";
import {connect}                     from "react-redux";
import {Link}                        from "react-router";
import Textarea                      from "react-textarea-autosize";

import {createMessageForGroup} from "app/groups/actions";
import {getTodayString}        from "app/utils/moment_helpers";
import classNames              from "./style";


const mapStateToProps = (state, otherProps) => {
  return {
    isCreating: state.groups.isCreatingMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createMessageForGroup
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Compose extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired
  }

  constructor () {
    super();
    this.state = {
      body: null
    };
  }

  render () {
    let buttonClass = null;
    let isSubmitDisabled = !(this.state.body && this.state.body.length > 0);
    let buttonText = isSubmitDisabled ?
      "Tell me more…" :
      "Wow, what a day."

    if (this.props.isCreating) {
      buttonClass = classNames.loading;
      buttonText = "Creating…"
    }

    return (
      <div className={classNames.compose}>
        <h1>{getTodayString()}</h1>
        <Textarea
          placeholder="How was your day?"
          minRows={2}
          autofocus={true}
          valueLink={{
            value: this.state.body,
            requestChange: this.bodyChanged.bind(this)
          }}
        />
        <button
          className={buttonClass}
          disabled={isSubmitDisabled}
          onClick={this.onClickSubmit.bind(this)}
        >
          {buttonText}
        </button>

      </div>
    );
  }

  bodyChanged (newBody) {
    this.setState({ body: newBody });
  }

  onClickSubmit () {
    this.props.createMessageForGroup(this.props.groupId, {
      body: this.state.body
    });
  }
}
