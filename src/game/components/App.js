import assert from 'assert';
import React, { Component } from 'react';
import './App.css';
import Player from './Player';
import PlayerOwn from './PlayerOwn';
import Client from './clientComponents/Client';

const socket = io.connect( 'http://localhost' );

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: 'test',
      players: [ 'players1', 'players2', 'players3' ],
      playerState: Array( this.props.playerNumber ),
      // 'none','chosen'(by the player who play the App ),// 'team_member'
      character: 'Merlin',
      // Merlin Percival Assassin Mordred Oberon Morgana Servant Minion
      gamesRecord: [],
      leaderUsername: '',
      showExplaination: false,
      missionMemberNum: 0,
      isVillain: Array( this.props.playerNumber ), // for villians and Merlin
      isMerlin: Array( this.props.playerNumber ), // for Percival only
      missionMemberArray: Array( this.props.playerNumber )
      tip: 'tip',
      tipClassName: 'show', // hide, show
      state: 'initState',
      // votingState missionState choosingTeamState accassinState
      voted: false,
      client: {},
      opacity: 0.5,
    };
    this.socket = socket;
    // this.socket.emit('username','FUCKUUUUUUU');
    this.socket.emit( 'msg', 'msg test' );
    this.socket.on( 'msg', msg => console.log( msg ) );
    if ( this.socket )
      this.state.client = new Client( this.socket, this );
    this.socket.on( 'setState', state => {
      console.log( state );
      for ( props in obj )
        
      this.setState( state );
    } );
    this.socket.on( 'showTips', tipsArray => {
      this.recursivelyShowTips( tipsArray );
    } );
    for ( let i = 0; i < 3; i += 1 ) {
      this.state.playerState[ i ] = 'none';
      this.state.isVillain[ i ] = false;
      this.state.isMerlin[ i ] = false;
      this.state.missionMemberArray[ i ] = false;
    }
  }

  recursivelyShowTips = tips => {
    console.log("recursivelyShowTips tips", tips);
    if ( !tips.length )
      return;
    console.log('hide');
    this.setState( { tip: '', tipClassName: '' } );
    let setTimeoutfunc = () => {
      this.setState( { tip: tips[ 0 ], tipClassName: 'show' } );
      tips.splice( 0, 1 );
      setTimeout( () => this.recursivelyShowTips( tips ), 1000 );
    };
    setTimeout( () => setTimeoutfunc(), 0 );
  };

  playerOnClick = i => {
    console.log( 'playerOnClick', i, this.state.playerState[ i ] );
    if ( this.state.leaderUsername === this.state.username ) {
      if ( this.state.playerState[ i ] === 'none' )
        this.state.playerState[ i ] = 'chosen';
      else if ( this.state.playerState[ i ] === 'chosen' )
        this.state.playerState[ i ] = 'none';
      else
        assert( 0 );
      this.setState( { playerState: this.state.playerState } );
    }
    else if ( this.state.state === 'choosingMerlin' && this.state.character === 'Assassin' ) {
      if ( this.state.playerState[ i ] === 'none' ) {
        for ( let j = 0; j < this.state.playerState.length; j += 1 )
          this.state.playerState[ j ] = 'none';
        this.state.playerState[ i ] = 'chosen';
        this.setState( { playerState: this.state.playerState } );
      }
      else if ( this.state.playerState[ i ] === 'chosen' ) {
        this.state.playerState[ i ] = 'none';
        this.setState( { playerState: this.state.playerState } );
      }
    }
  };

  renderPlayers = () => {
    const renderPlayers = this.state.players.map( ( v, i ) => (
      <Player
      key={i} playerOnClick={ () => this.playerOnClick( i ) }
      img = { 'not done!!!' }
      username = { v }
      isLeader = { this.state.state === 'choosingTeam' && this.state.leaderUsername === v }
      isVillain = { this.state.isVillain[ i ] }
      playerState = { this.state.playerState[ i ] }
      isMerlin = { this.state.isMerlin[ i ] }
      >
      </Player>
    ) );
    return renderPlayers;
  };

  explaination = () => {
    if ( this.state.showExplaination )
      return <div onClick = { () => {
        this.setState( { showExplaination: false } );
      }} >
      'explaination not done!!!!'
    </div>;
    return;
  };


  submitMissionMemberArray = () => {
    console.log( 'submitMissionMemberArray' );
    const missionMemberArray = this.state.playerState.map( playerState => playerState === 'chosen' );
    let counter = 0;
    for ( let idx = 0; idx < missionMemberArray.length; idx += 1 )
      if ( missionMemberArray[ idx ] )
        counter += 1;
    if ( counter === this.state.missionMemberNum ) {
      this.socket.emit( 'missionMemberArray', missionMemberArray );
      this.socket.emit( 'msg', missionMemberArray );
      for ( let idx = 0; idx < this.state.playerState.length; idx += 1 )
        this.state.playerState[ idx ] = 'none';
      console.log( 'counter !== this.state.missionMemberNum ' );
      console.log( counter, this.state.missionMemberNum );
      console.log( 'this.socket', this.socket );
    }
  };

  stateControl = () => {
    if ( this.state.voted )
      return;
    if ( this.state.state === 'votingState' ) {
      return <div>
        <button type="button" className="btn btn-primary margin btn-lg"
          onClick={ () => {
            this.socket.emit( 'vote', true );
            this.setState( { voted: true } );
          }}>
          Agree
        </button>
        <button type="button" className="btn btn-primary margin btn-lg"
          onClick={() => {
            this.socket.emit( 'vote', false );
            this.setState( { voted: true } );
          }}>
          Veto
        </button>
      </div>;
    }
    else if ( this.state.state === 'missionState' ) {
      const idx = this.state.players.indexOf( this.state.username );
      if ( this.state.missionMemberArray[ idx ] ) {
        return <div>
          <button type="button" className="btn btn-primary margin btn-lg"
            onClick={ () => {
              this.socket.emit( 'mission', true );
              this.setState( { voted: true } );
            }}>Success</button>
          <button type="button" className="btn btn-primary margin btn-lg"
            onClick={ () => {
              if ( this.state.character === 'Merlin' ||
                 this.state.character === 'Percival' ||
                 this.state.character === 'Servant' )
                this.setTips( [ 'Good team cant make mission fail!' ] );
              else {
                this.socket.emit( 'mission', false );
                this.setState( { voted: true } );
              }
            }}>Fail</button>
        </div>;
      }
      else
        return <p>Waiting other people who taking the mission...</p>;
    }
    else if ( this.state.state === 'choosingTeamState' ) {
      if ( this.state.username === this.state.leaderUsername ) {
        return <div>
            <button type="button"
              onClick={ e => this.submitMissionMemberArray( e ) }
              className={ 'btn btn-primary margin btn-lg' } >
              Submit
            </button>
          </div>;
      }
    }
    else if ( this.state.state === 'accassinState' && this.state.character === 'Assassin' ) {
      return <div>
          <button type="button"
            onClick={( e ) => {
              const idx = this.state.players.indexOf( 'chosen' );
              this.socket.emit( 'accassin', players[ idx ] );
              this.setState( { voted: true } );
              console.log( 'accassin', idx );
            } }
            className={'btn btn-primary blue' } >
            Submit</button>
        </div>;
    }
    return;
  };

  render() {
    const idx = this.state.players.indexOf( this.state.username );
    return (
      <div className="container app" >
        <div className="row">
          <div className="col-xs-9">
            { this.renderPlayers() }
            <bottun className={ 'btn btn-primary' }
              onClick = { () => this.socket.emit( 'msg', 'test msg' ) }>
              test
            </bottun>
            <bottun className={ 'btn btn-primary' }
              onClick = { () =>{
                this.recursivelyShowTips( [ 'test1', 'test2', 'test3' ] );
              } }>
              test2
            </bottun>
          </div>
          <div className="chat col-xs-3" style={{ }}>
            <row> <img src="map5.png" height="150" width="250"alt=""/>
            </row>
          chat room
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <div >
              <PlayerOwn
                playerState = { this.state.playerState[ idx ] }
                username = { this.state.username }
                character = { this.state.character }
                gamesRecord = { this.state.gamesRecord }
                state = { this.state.state}
                isVillain = { this.state.isVillain }
                isMerlin = { this.state.isMerlin }
                onclick = { () => {
                  this.state.playerState[ idx ] = 'chosen';
                  this.setState( { playerState: this.state.playerState } );
                } }
                isLeader={ this.state.leaderUsername === this.state.username }
                showExplaination={() => this.setState( { showExplaination: true } )}
              />
              <li>players:{this.state.players}</li>
              <li>gamesRecord:{this.state.gamesRecord.map( v => v ? 1 : 0 )}</li>
              { this.explaination() }
              <div className = { this.state.tipClassName } style = { { opacity: this.state.opacity } }>
                { this.state.tip }
              </div>
            </div>
          </div>
          <div className="col-xs-2">
              {this.stateControl()}

          </div>
        </div>
      </div> );
  }
}

export default App;
