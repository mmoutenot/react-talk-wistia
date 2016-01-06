import React, {Component} from "react";
import classNames from "./styles";

export default class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render () {
    const isSubmitDisabled = !this.state.email || !this.state.password;
    return (
      <div className={classNames.loginContainer}>
        <h1>Speakeasy</h1>
        <form onSubmit={this._handleSubmit.bind(this)}>

          <input value={this.state.email} onChange={this._handleEmailChange.bind(this)}
            type="email" placeholder="Email" />

          <input value={this.state.password} onChange={this._handlePasswordChange.bind(this)}
            type="password" placeholder="Password" />

          {this._renderAuthenticationErrors()}

          <div>
            <input type="submit" value="Login" disabled={isSubmitDisabled} />
          </div>

        </form>

      </div>
    );
  }

  _renderAuthenticationErrors () {
    if (this.props.authenticationError) {
      return <div>Login failed. Hopefully it was just a typo!</div>
    }
  }

  _handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit({email: this.state.email, password: this.state.password});
  }

  _handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  _handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

}
