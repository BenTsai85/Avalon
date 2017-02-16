import React, { Component } from 'react';
import './UserList.css';

const gamelobby_chat = io( 'http://localhost:3000/' );

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    gamelobby_chat.on( 'set_players', ( msg ) => {
      console.log( 'set players' );
      this.setState( { users: msg } );
    } );
  }
  render() {
    return <div>
          <ul className="list-group lobby_user_list">
            {this.state.users.map( ( v, i ) => <li className="list-group-item" key={i}>{v}</li> )}
          </ul>
      </div>;
  }
}

export default App;
