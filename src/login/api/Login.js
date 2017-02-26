import React, { Component } from 'react';
import './Login.css';


const socket = io.connect();
class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: '',
      password: '',
    };
    socket.on( 'RFID', async RFID => {
      await this.setState( { password: RFID } );
      this.login();
  } );
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
        console.log(res);
        if ( res.status )
          this.props.changeLoc( 'gamelobby' );
      } );
  };

  render() {
    return (
      <div className="login jumbotron">
        <h1>Health Keeper</h1>
        <form>
          <h2>Login with RFID</h2>
          <div id="wrongPassword"/>
          <div className="form-group" id="passwordDiv">
            <label htmlFor="password" />
            <input type="password" id="password" className="form-control" placeholder="Password"
              value={ this.state.password }
              onChange={ ( e ) => { this.setState( { password: e.target.value } ); } }/>
          </div>
        </form>
        <button id="submit" className="btn btn-default" onClick={ () => this.login() }>submit</button>
        <a id="signup" onClick={ () => this.props.changeLoc( 'signup' ) }>Sign Up</a>
        <button className="btn btn-default" onClick={ async ()  => { 
          await this.setState({password:'aaaaaa'});
          this.login(); }}
          >
          test
        </button>
        
      </div>
    );
  }
}

export default Login;
