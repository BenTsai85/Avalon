import React, { Component } from 'react';
import Chatroom from './Chatroom';
import ControlPanel from './ControlPanel';
import UserList from './UserList';
import GameroomList from './GameroomList';
import History from './History';
import Heartbeat from './Heartbeat';
import Menu from './Menu';
import './App.css';


const gamelobby_chat = io( 'http://localhost:3000' );

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      name: 'not login',
      loc: 'Menu',// 'menu', 'heartbeat','history'
    };
  }
  componentWillMount() {
    fetch( '/api/gamelobby', {
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( ( res ) => {
        this.setState( { name: res.name } );
      } );
  }

  logout = () => {
    fetch( '/auth/logout', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'same-origin',
    } )
      .then( res => res.json() )
      .then( res => {
        this.props.changeLoc( 'login' );
      } )
      .catch( err => {
        console.error( err );
      } );
  };

  contentRender = () => {
    if ( this.state.loc === 'Menu' )
      return <Menu setLoc = { loc => this.setState( { loc } ) } />;
    else if ( this.state.loc === 'History' )
      return <History back = { () => this.setState( { loc: 'Menu' } ) } />;
    else if ( this.state.loc === 'Heartbeat' )
      return <Heartbeat back = { () => this.setState( { loc: 'Menu' } ) } />;
  };

  render() {


    return <div className="container margin">
        <div className="row">
          <button type="button" className="btn btn-default right-btn">{`${this.state.name} profile`}</button>
          <button type="button" className="btn btn-default right-btn" onClick={ this.logout }>Log out</button>
        </div>
        { this.contentRender() }
      </div>;
  }
}

export default App;
