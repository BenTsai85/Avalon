import React, { Component } from 'react';
import './App.css';
import Player from './Player';
// import './TetrisPieces.js';
// import * from './client.js'
// import SingleUserPage from './SingleUserPage';
const socket = io();

// socket.on('register',(id)=>{a(id);});
// socket.on('ready',(e)=>{console.log(e);});
// socket.on('message',(e)=>{console.log(e);});
// socket.on('b',(e)=>{
//   console.log(e);

// });
// socket.on('c',(e)=>{console.log(e);});
// function a(e){
//   this.setState({ID:e});
//   console.log('AAA');
//   console.log(this.state.ID);

// }
// function pack(e){
//   return {
//     ID:this.state.ID,
//     value:e
//   };
// }
// socket.on('myname',(e)=>{setID(e);});
// function setID(e) {
//   this.setState({ID:e});
// }

// socket.on('addPlayer',(e)=>{})
// function addPlayer() {
//   this.setState({ID:e});
// }


socket.on( 'msg', e => { console.log( e ); } );
socket.on( 'myid', e => { init( e, 'myid' ); } );
socket.on( 'start', e => { init( e, 'start' ); } );
socket.on( 'asign_Leader', e => { init( e, 'asign_Leader' ); } );

function init( e, command ) {
  console.log( 'init', command );
  if ( command === 'start' )
    this.setState( { players: e } );
  else if ( command === 'myid' )
    this.setState( { ID: e } );
  else if ( command === 'asign_Leader' )
    this.setState( { leader: e } );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: false,
      players: [ 'default0', 'default1' ],
      ID: 0,
      character: 'not yet allocate',
      game: [ 'not begin' ],
      stage: 'not begin', // 'not begin','voting','mission','chooseTeam','wait'
      leader: -1,
      chooser: [ 0, 0, 0 ],
    };
    // a = a.bind(this);
    this.vote = this.vote.bind( this );
    this.mission = this.mission.bind( this );
    init = init.bind( this );
    socket.on( 'setStage', e => { this.setState( { stage: e } ); } );
    socket.on( 'asign_Leader', e => {
      this.setState( { leader: e } );
      if ( this.state.leader === this.state.ID )
        this.setState( { stage: 'chooseTeam' } );
      else
        this.setState( { stage: 'wait' } );
    } );
    socket.on( 'players', e => { this.setState( { players: e } ); } );
    this.submit = this.submit.bind( this );
  }

  vote( e ) {
    socket.emit( 'vote', e );
  }
  mission() {
    socket.emit( 'mission', e );
  }
  players() {
    const p = this.state.players;
  }
  submit() {
    if ( this.state.stage === 'chooseTeam' )
      socket.emit( 'chooseTeam', this.state.players.filter( ( v, i ) => this.state.chooser[ i ] == true ) );
  }
  render() {
    return (
      <div >
        <li>I am:{this.state.ID}</li>
        <li>my character:{this.state.character}</li>
        <li>player:{this.state.players.length}</li>
        <li>started:{( this.state.started ) ? 1 : 0}</li>
        <li>game:{this.state.game.map( v => v )}</li>
        <li>stage:{this.state.stage}</li>
        <li>leader:{this.state.leader}</li>
        <button onClick={ () => { this.vote( 1 ); } }>positive vote</button>
        <button onClick={ () => { this.vote( 0 ); } }>negtive vote</button>
        <button onClick={ () => { this.mission( 1 ); } }>mission success</button>
        <button onClick={ () => { this.mission( 0 ); } }>mission fail</button>
        <button onClick={ () => {} }>Go Mission</button>
        <button onClick={ () => { socket.emit( 'a', 'none' ); } }>Test</button>
        <button onClick={ () => { this.submit(); } }>Submit(use only when leader)</button>
        <div>
          {

            this.state.players.map( ( v, i ) => (
                <Player choose={ e => {
                  this.state.chooser[ i ] = !this.state.chooser[ i ];
                  this.setState( { chooser: this.state.chooser } );
                  if ( e.target.className === 'chosen' )
                    e.target.className = '';
                  else
                    e.target.className = 'chosen';
                } } name={ v } key={ i } id={ i }> </Player>
            ) )
          }
        </div>
      </div> );
  }

}

export default App;

            // this.state.players.map((v,i)=>{return(
            //     <Player choose={()=>{
            //         this.state.chooser=0;
            //         this.setState({chooser:this.state.chooser
            //       });}} name={v} key={i} id={i}</Player>
            //   );})
