import _                             from "lodash"
import React, {Component, PropTypes} from "react";
import {Link}                        from "react-router";

import classNames from "./style";


export default class Day extends Component {
  render () {
    return (
      <div className={classNames.day}>
        <h1>{this.props.day}</h1>
        <div>
          {_.map(this.props.messages, (message, key) => {
            let user = this.props.usersById[message.speakeasyUserId]
            return (
              <div className={classNames.message} key={key}>
                <span className={classNames.authorName}>
                  {user.name}
                </span>
                <br/>
                <div className={classNames.messageBody}>
                  {message.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
