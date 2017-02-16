import React, { Component } from 'react';
import './GameroomList.css';


const gamelobby_chat = io( 'http://localhost:3000/' );
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      gamerooms: [ { roomname: 'd', player_num: 2, max_player_num: 5, id: 0 } ],
    };
  }
  componentDidMount() {
    gamelobby_chat.on( 'set_gamerooms', msg => this.setState( { gamerooms: msg } ) );
  }
  render() {
    return <div className="panel panel-primary gameroom-body" >
            <div className="panel-heading">
                Gameroom Lists
            </div>
            <div className="panel-body" >
                <ul className="list-group">
                    {
                      this.state.gamerooms.map( ( v, i ) => <li className="list-group-item" key={i} onClick={ () => { this.props.changeLoc( 'gameroom' ); } }>
                        {v.roomname}
                      </li> )
                    }
                </ul>
            </div>
        </div>;
  }
}

export default App;
