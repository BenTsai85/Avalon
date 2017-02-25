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
      loc: 'login',
      user: { id: null, name: null, },
    };
  }

  componentWillMount() {
    // console.log(1);
    fetch( '/auth/check', {
      method: 'POST',
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.status )
          this.setState( { loc: 'gamelobby', user: { id: res.userId, name: res.userName, }, } );
      } );
  }

  changeLoc = ( loc ) => {
    // console.log(2);
    fetch( '/auth/check', {
      method: 'POST',
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.status ) {
          this.setState( { user: { id: res.userId, name: res.userName, }, } );
        }
      } );
    this.setState( { loc: loc } );
  }

  renderRoute = () => {
    // console.log(3);
    if ( this.state.loc === 'signup' )
      return <SignUp changeLoc={ this.changeLoc }/>;

    if ( this.state.loc === 'game' )
      return <GameApp player_number={3}/>;

    if ( this.state.loc === 'gameroom' )
      return <GameRoomApp changeLoc={ this.changeLoc }/>;

    if ( this.state.loc === 'gamelobby' )
      return <GameLobbyApp changeLoc={ this.changeLoc } user={ this.state.user }/>;

    return <Login changeLoc={ this.changeLoc }/>;
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
