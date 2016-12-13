import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidUpdate() {
    if ( this.props.error ) {
      document.getElementById( 'wrongPassword' ).innerHTML = 'Wrong User Name or Password!';
      document.getElementById( 'wrongPassword' ).className = 'alert alert-danger';
    }
  }

  render() {
    return (
      <div className="login jumbotron">
        <h1>Foodzone</h1>
        <form action='#' onSubmit={ () => this.props.login( this.state.username, this.state.password ) } className="">
          <h2>Login</h2>
          <div id="wrongPassword"/>
          <div className="form-group">
            <label htmlFor="username" />
            <input type="text" id="username" className="form-control" placeholder="User Name"
              value={ this.state.username }
              onChange={ e => { this.setState( { username: e.target.value } ); } }/>
          </div>
          <div className="form-group" id="passwordDiv">
            <label htmlFor="password" />
            <input type="password" id="password" className="form-control" placeholder="Password"
              value={ this.state.password }
              onChange={ e => { this.setState( { password: e.target.value } ); } }/>
          </div>
          <input type="submit" value="submit" id="submit" className="btn btn-default" />
          <a href='?#/signup' id="signup">Sign Up</a>
        </form>
      </div>
    );
  }
}

export default Login;
