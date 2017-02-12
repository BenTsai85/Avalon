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
    };
    this.renderRoute = this.renderRoute.bind( this );
  }


  componentDidMount() {
    window.addEventListener( 'hashchange', () => {
      this.setState( {
        route: window.location.hash.substr( 1 ),
      } );
    } );
  }

  renderRoute() {
    if ( this.state.route === '/signup' )
      return <SignUp signup={ this.signup } error={ this.state.error } loadImage={ this.loadImage } checkName={ this.checkName }/>;


    if ( this.state.route === '/users' )
      return <Profile username={ this.state.username } password={ this.state.password } email={ this.state.email } icon={ this.state.icon } friendlist={ this.state.friendlist } />;


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
