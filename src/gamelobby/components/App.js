import React, { Component } from 'react';
import Chatroom from './Chatroom';
import ControlPanel from './ControlPanel';
import UserList from './UserList';
import GameroomList from './GameroomList';
import './App.css';


const gamelobby_chat = io( 'http://localhost:3000/gamelobby' );

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      name: 'not login',
    };
  }
  componentWillMount() {
    fetch( '/api/gamelobby', {
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( ( res ) => {
        this.setState( { name: res.name } );
        gamelobby_chat.emit( 'player_connect', res.name );
      } );
  }

  render() {
    return <div className="container margin">
        <div className="row">
          <button type="button" className="btn btn-default right-btn">{`${this.state.name} propfile`}</button>
          <button type="button" className="btn btn-default right-btn">Log out</button>
        </div>
        <div className="row">
          <div className="col-xs-9">
            <GameroomList/>
          </div>
          <div className="col-xs-3">
            <UserList/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9">
            <Chatroom/>
          </div>
          <div className="col-xs-3">
            <ControlPanel/>
          </div>
        </div>
      </div>;
  }
}

export default App;
