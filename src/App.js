import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import GameApp from './game/components/App';
import GameLobbyApp from './gamelobby/components/App';
import GameRoomApp from './gameroom/components/App';
import Login from './login/api/Login';
import SignUp from './login/api/SignUp';
import Profile from './login/api/Profile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: window.location.hash.substr( 1 ),
      userId: null,
    };
  }

  componentWillMount() {
    window.addEventListener( 'hashchange', () => {
      this.setState( {
        route: window.location.hash.substr( 1 ),
      } );
    } );

    fetch( '/auth/check', {
      method: 'POST',
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.status )
          this.setState( { userId: res.userId } );
      } );
  }

  renderRoute = () => {
    if ( this.state.route === '/signup' )
      return <SignUp />;

    if ( this.state.userId ) {
      if ( this.state.route === '/game' )
        return <GameApp player_number={3}/>;

      if ( this.state.route === '/gameroom' )
        return <GameRoomApp />;

      return <GameLobbyApp />;
    }

    return <Login />;
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
