import assert from 'assert';
import React, { Component } from 'react';
import './App.css';
import Player from './Player';
import PlayerOwn from './PlayerOwn';

const socket = io.connect( 'http://localhost' );

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: 'default',
      players: [ 'players1', 'players2', 'players3' ],
      playerState: Array( this.props.player_number ),
      // 'none','chosen'(by the player who play the App ),// 'team_member'
      character: 'notBeAllocated',
      // Merlin Percival Assassin Mordred Oberon Morgana Servant Minion
      gamesRecord: [],
      leaderUsername: '',
      showExplaination: false,
      missionMemberUsernames: [],
      isVillain: Array( this.props.player_number ),
      isMerlin: Array( this.props.player_number ),
      tip: 'tip',
      tipClassName: 'hide',
    };

    for ( let i = 0; i < this.props.player_number; i += 1 ) {
      this.state.playerState[ i ] = 'none';
      this.state.isVillain[ i ] = false;
      this.state.isMerlin[ i ] = false;
    }

    socket.on( 'character', ( e ) => {
      this.setState( { character: e } );
      if ( this.state.character === 'Minion'
          || this.state.character === 'Assassin'
          || this.state.character === 'Mordred'
          || this.state.character === 'Oberon'
          || this.state.character === 'Morgana'
          )
        this.setState( { team: false } );

      else if ( this.state.character === 'Merlin'
        || this.state.character === 'Percival'
        || this.state.character === 'Servant' )
        this.setState( { team: true } );
    } );
  }

  renderPlayers = () => {
    const renderPlayers = this.state.players.map( ( v, i ) => (
        <div key={i} onClick={( e ) => {
          if ( this.state.leader === this.state.username ) {
            if ( this.state.playerState[ i ] === 'none' ) this.state.playerState[ i ] = 'chosen';
            else if ( this.state.playerState[ i ] === 'chosen' )
              this.state.playerState[ i ] = 'none';

            else
              assert( 0 );

            this.setState( { playerState: this.state.playerState } );
          }
          else if ( this.state.stage === 'choosingMerlin' || this.state.character === 'Assassin' ) {
            console.log( 'player is onclick' );
            if ( this.state.playerState[ i ] === 'none' ) {
              console.log( 'none?' );
              for ( let j = 0; j < this.state.playerState.length; j += 1 ) this.state.playerState[ j ] = 'none';
              this.state.playerState[ i ] = 'chosen';
              this.setState( { playerState: this.state.playerState } );
            }
            else if ( this.state.playerState[ i ] === 'chosen' ) {
              this.state.playerState[ i ] = 'none';
              this.setState( { playerState: this.state.playerState } );
            }
          }
        }} >
          <Player
          username = { v }
          isLeader = { this.state.stage === 'choosingTeam' && this.state.leader === v }
          isVillain = { this.stateisVillain[ i ] }
          playerState = { this.state.playerState[ i ] }
          isMerlin = { this.state.isMerlin[ i ] }
          >
          </Player>
        </div>
    ) );
    return renderPlayers;
  };

  explaination = () => {
    if ( this.state.showExplaination )
      return <div>
      'not done!!!!'
    </div>;
    return ;
  };

  setTips = ( tips ) => {
    let interval = 0;
    let clearIdx = setInterval( () => {
      interval = 5000;
      this.setState({ tipClassName: 'hide' });
      this.setState({ tip: tips.shift(), tipClassName: 'show' });
    }, interval );
    if( !this.state.tips.length )
      clearInterval( clearIdx );
  }

  render() {
    return (
      <div className="container app" >

        <div className="row">
          <div className="col-xs-9">
            { this.renderPlayers }
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
                character={this.state.character}
                gamesRecord={this.state.gamesRecord}
                stage={this.state.stage}
                onclick={this.playerOwnPhotoOnclick.bind( this )}
                isLeader={ this.state.leaderUsername === this.state.username }
                showExplaination={() => this.setState( { showExplaination: true } )}
              />
              { this.explaination() }
              <div className = { this.state.tipClassName }>
                { this.state.tip }
              </div>
            </div>
          </div>
          <div className="col-xs-2">
              
          </div>
        </div>
      </div> );
  }
  }

}

export default App;
