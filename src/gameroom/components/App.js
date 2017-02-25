import React, { Component } from 'react';
import Chatroom from './Chatroom';
import Gamesetting from './Gamesetting';
import Member from './Member';
import './App.css';


const gameroom_chat = io( 'http://localhost:3000/gameroom' );

const default_player = { img: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12742136_736274853140630_5037882521848371900_n.jpg?oh=5753439b51912ba5823f002ec5909984&oe=58C1FA98',
	    		  name: 'default',
  is_chief: false,
  is_ready: false };

class App extends Component {
  	constructor( props ) {
	    super( props );
	    this.state = {
	    	myname: '',
	   		is_chief: '',
	    	members: [],
	   	};
  }
  componentWillMount() {
    gameroom_chat.on( 'set_gameroom_players_setting', ( msg ) => {
      this.setState( { members: msg } );
      this.state.members.map( ( v, i ) => {
        if ( v.name === this.state.myname )
          this.setState( { is_chief: v.is_chief } );
      } );
    } );

    gameroom_chat.on( 'game_start', ( msg ) => {
      document.location.href = ( '/game' );
    } );

    let myself;
	    fetch( '/api/gamelobby', { // get user
	    	credentials: 'same-origin',
	    	} )
	    	.then( res => res.json() )
	    	.then( ( res ) => {
	    		console.log( 'rrrrrrr', res );
	    		const myself = { img: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12742136_736274853140630_5037882521848371900_n.jpg?oh=5753439b51912ba5823f002ec5909984&oe=58C1FA98',
	    		  name: res.name,
      is_chief: false,
      is_ready: false };
	    		this.setState( { myname: res.name } );
	    		gameroom_chat.emit( 'gameroom_connect', myself );
	    		} );
  }
  	render() {
	    return <div className="container">
	    	<div className="row">
	    		<div className="col-xs-9">
		    		<div className="row members_container">
		    			{this.state.members.map( ( v, i ) => <Member classname_prop={v.is_ready ? 'is_ready' : ''} key={i} img={v.img} name={v.name}/> )}
		    		</div>
		    		<div className="row">
		    			<Chatroom name={this.state.myname}/>
		    		</div>
	    		</div>
	    		<div className="col-xs-3">
	    			<Gamesetting is_chief={this.state.is_chief}/>
	    		</div>
	    	</div>
	    </div>;
  }
}

export default App;
