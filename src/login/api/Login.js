import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor( props ) {
    super( props );
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

  login = () => {
    console.log( 'login' );
    const user = {
      name: this.state.username,
      password: this.state.password,
    };
    fetch( '/auth/login/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( user ),
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.status )
          this.props.changeLoc( 'gamelobby' );
      } );
  };

  render() {
    return (
      <div className="login jumbotron">
        <h1>Avalon</h1>
        <form>
          <h2>Login</h2>
          <div id="wrongPassword"/>
          <div className="form-group">
            <label htmlFor="username" />
            <input type="text" id="username" className="form-control" placeholder="User Name"
              value={ this.state.username }
              onChange={ ( e ) => { this.setState( { username: e.target.value } ); } }/>
          </div>
          <div className="form-group" id="passwordDiv">
            <label htmlFor="password" />
            <input type="password" id="password" className="form-control" placeholder="Password"
              value={ this.state.password }
              onChange={ ( e ) => { this.setState( { password: e.target.value } ); } }/>
          </div>
        </form>
        <button id="submit" className="btn btn-default" onClick={ () => this.login() }>submit</button>
        <a id="signup" onClick={ () => this.props.changeLoc( 'signup' ) }>Sign Up</a>
      </div>
    );
  }
}

export default Login;
