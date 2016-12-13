import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: window.location.hash.substr( 1 ),
      username: '',
      password: '',
      id: 0,
      friendlist: [],
      error: false,
    };
    this.setState = this.setState.bind( this );
    this.login = this.login.bind( this );
    this.signup = this.signup.bind( this );
    this.renderRoute = this.renderRoute.bind( this );
    this.checkName = this.checkName.bind( this );
  }


  componentDidMount() {
    window.addEventListener( 'hashchange', () => {
      this.setState( {
        route: window.location.hash.substr( 1 ),
      } );
    } );
  }

  login( username, password ) {
    fetch( '/api/login', {
      method: 'POST',
      body: JSON.stringify( { username, password } ),
    } )
      .then( res => res.json() )
      .then( data => {
        if ( typeof data.id === 'undefined' )
          this.setState( { error: true } );
        else {
          this.setState( {
            id: data.id,
            password,
            username,
            friendlist: data.friendlist,
          } );
          location.hash = '#/users';
        }
      } )
      .catch( error => {
        console.log( 'Login Error!' );
      } );
  }

  signup( username, password, email, icon ) {
    fetch( '/api/signup', {
      method: 'POST',
      body: JSON.stringify( { username, password } ),
    } )
      .then( res => res.text() )
      .then( data => {
        location.hash = '#/login';
        this.setState( { error: false } );
      } )
      .catch( error => {
        console.log( 'Sign Up Error!' );
      } );
  }

  checkName( value ) {
    const check = new FormData();
    check.append( 'username', value );
    fetch( '/api/checkName', {
      method: 'POST',
      body: check,
    } )
      .then( res => res.json() )
      .then( data => {
        if ( data.success )
          this.setState( { error: false } );
        else
          this.setState( { error: true } );
      } )
      .catch( error => {
        console.log( 'Check Name Error!' );
      } );
  }

  renderRoute() {
    if ( this.state.route === '/signup' )
      return <SignUp signup={ this.signup } error={ this.state.error } checkName={ this.checkName }/>;

    if ( this.state.route === '/users' )
      return <Profile username={ this.state.username } password={ this.state.password } friendlist={ this.state.friendlist } />;

    return <Login login={ this.login } error={ this.state.error }/>;
  }

  render() {
    return (
      <div>
        { this.renderRoute() }
      </div>
    );
  }
}


export default App;
