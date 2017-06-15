import React, { Component } from 'react';
import Chatroom from './Chatroom';
import ControlPanel from './ControlPanel';
import UserList from './UserList';
import GameroomList from './GameroomList';
import History from './History';
import Weather from './Weather';
import Air from './Air';
import Deposit from './Deposit';
import Menu from './Menu';
import './App.css';
import Profile from './Profile';
import Sales from './Sales';

const gamelobby_chat = io();

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      name: 'not login',
      loc: 'Menu',// 'Menu', 'Weather','History', 'Air', 'Deposit'
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
    else if ( this.state.loc === 'Weather' )
      return <Weather back = { () => this.setState( { loc: 'Menu' } ) } />;
    else if ( this.state.loc === 'Air' )
      return <Air back = { () => this.setState( { loc: 'Menu' } ) } />;
    else if ( this.state.loc === 'Deposit' )
      return <Deposit back = { () => this.setState( { loc: 'Menu' } ) } />;
    else if ( this.state.loc === 'History' )
      return <History back = { () => this.setState( { loc: 'Menu' } ) } />;
    else if ( this.state.loc === 'Profile' )
      return <Profile back = { () => this.setState( { loc: 'Menu' } ) }/>
    else if ( this.state.loc === 'Sales' )
      return <Sales back = { () => this.setState( { loc: 'Menu' } ) }/>
  };

  render() {


    return <div className="container margin">
        <div className="row">
          <button type="button" className="btn btn-default right-btn" onClick={ () => { this.setState( { loc: 'Profile' } ); } }>{`${this.state.name} profile`}</button>
          <button type="button" className="btn btn-default right-btn" onClick={ this.logout }>Log out</button>
        </div>
        { this.contentRender() }
      </div>;
  }
}

export default App;
