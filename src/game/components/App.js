import React, { Component } from 'react';
import './App.css';
import Player from './Player';
import assert from 'assert';
import PlayerOwn from './PlayerOwn.js';
// import * from './client.js'
// import SingleUserPage from './SingleUserPage';
// const socket = io();
const socket = io.connect( 'http://localhost' );
function fadeIn( elem, speed, opacity ) {
  speedspeed = speed || 20;
  opacityopacity = opacity || 100;
  elem.style.display = 'block';
  iBase.SetOpacity( elem, 0 );
  let val = 0;
  ( function () {
    iBase.SetOpacity( elem, val );
    val += 5;
    if ( val <= opacity )
      setTimeout( arguments.callee, speed );
  }() );
}

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      players: [],
      players_state: Array( this.props.player_number ), // 'none','chosen'(by the player who play the App ),
      // 'team_member'
      team: 0, // true for good man, false for bad man
      ID: 0, // socket.id
      index: -1,
      character: 'not_be_allocated', // 'not_be_allocated',
      // Merlin Percival Assassin Mordred Oberon Morgana Servant Minion
      games_record: [],
      stage: 'not begin', // 'not begin','voting',
      // 'missioning','choosingTeam',
      leader: '', // according to ID
      mission_team_members: Array( this.props.player_number ),
      voting_outcome: 0,
      tips: [ 'className', 'Message' ],
      test: '',
      voted: false,
      show_explaination: false,
      is_bad_men: Array( this.props.player_number ),
      is_Merlin: Array( this.props.player_number ),
    };
    this.new_round_reset = this.new_round_reset.bind( this );
    this.vote = this.vote.bind( this );
    this.mission = this.mission.bind( this );
    this.stage_control = this.stage_control.bind( this );
    this.show_tips = this.show_tips.bind( this );
    this.test = this.test.bind( this );
    this.render_test = this.render_test.bind( this );

    for ( let i = 0; i < this.props.player_number; ++i ) {
      this.state.players_state[ i ] = 'none';
      this.state.is_bad_men[ i ] = false;
      this.state.is_Merlin[ i ] = false;
    }

    socket.emit( 'player_number', this.props.player_number );
    console.log( 'this.players_state', this.state.players_state );
    socket.on( 'msg', ( e ) => { console.log( e ); } );
    socket.on( 'myid', e => this.setState( { ID: e } ) );
    socket.on( 'index', ( e ) => {
      this.setState( { index: e } );
    } );

    socket.on( 'start', ( e ) => {
      this.setState( { players: e } );
      this.show_tips( [ 'The Game Start!' ] );
    } );

    socket.on( 'assign_leader', ( e ) => {
      console.log( 'assign_leader', e );
      for ( let i = 0; i < this.props.player_number; ++i )
        this.state.players_state[ i ] = 'none';
      this.setState( { leader: e } );
      this.setState( { stage: 'choosingTeam' } );
      if ( e === this.state.ID )
        this.show_tips( [ 'Choose the people you trust....(click their portrait)' ] );
      else
        this.show_tips( [ 'Waiting the leader choosing the team members...' ] );
    } );

    socket.on( 'assign_mission_member_and_vote', ( e ) => {
      console.log( 'assign_mission_member_and_vote', e );
      console.log( 'this.players_state', this.state.players_state );
      for ( let i = 0; i < e.length; ++i )

        this.state.players_state[ e[ i ] ] = 'team_member';

      this.setState( { voted: false } );
      this.setState( { stage: 'voting' } );
      this.setState( { players_state: this.state.players_state } );
      this.setState( { mission_team_members: e } );
      this.show_tips( [ 'The chosen people are going to take the mission, do you trust they?' ] );
    } );

    socket.on( 'inform_voting_outcome', ( e ) => {
      console.log( 'inform_voting_outcome', e );
      this.setState( { voting_outcome: e } );
      this.setState( { voted: false } );
      if ( e ) {
        this.setState( { stage: 'missioning' } );
        this.show_tips( [ 'Vote Success!' ] );
        setTimeout( () => {
          if ( this.state.mission_team_members.indexOf( this.state.index ) != -1 ) { // Merlin Percival Assassin Mordred Oberon Morgana Servant Minion
            if ( this.state.character === 'Minion' || this.state.character === 'Assassin' )
              this.show_tips( [ 'You can vote "Yes" to hide your character, or just make the mission fail...' ] );
            else
              this.show_tips( [ 'You can only vote "Yes"...' ] );
          }
          else
            this.show_tips( [ 'Waiting others voting...' ] );
        },
          5000 );
      }
      else {
        this.show_tips( [ 'Vote Fail!' ] );
        setTimeout( () => this.new_round_reset(), 5000 );
      }
    } );

    socket.on( 'inform_mission_outcome', ( e ) => {
      console.log( 'inform_mission_outcome', e );
      if ( e )
        this.show_tips( [ 'Mission Success' ] );
      else
        this.show_tips( [ 'Mission Fail' ] );
      setTimeout( () => {
        this.setState( { games_record: [ ...this.state.games_record, e ] } );
        this.setState( { stage: 'choosingTeam' } );
        this.new_round_reset();
      }, 5000 );
    } );

    socket.on( 'game_over', ( e ) => {
      if ( e > 0 ) {
        if ( this.state.team )
          this.show_tips( [ 'You Win!', 'Waiting bad men guess Merlin...' ] );
        else {
          this.show_tips( [ 'Losers~ You should guess who is Merlin',
            'If you Guess correctly, you win!' ] );
        }
        this.setState( { stage: 'choosingMerlin' } );
      }
      else if ( this.state.team )
        this.show_tips( [ 'Poor Losers! QAQ HAHAHA!' ] );
      else
        this.show_tips( [ 'Congratulations! You Win!' ] );
    } );

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

    socket.on( 'accassin', ( e ) => {
      if ( e ) {
        if ( this.state.team )
          this.show_tips( [ 'Accassin success', 'You Lose!' ] );
        else
          this.show_tips( [ 'Accassin fail', 'You Win!' ] );
      }
      else if ( this.state.team )
        this.show_tips( [ 'Accassin Fail', 'You win!' ] );
      else
            this.show_tips( [ 'Accassin Fail', 'You lose!' ] );
    } );
    socket.on( 'set_skill', ( e ) => {
      console.log( 'set_skill', e );
      console.log( ( ( !this.state.team ) && ( this.character !== 'Oberon' ) ) );

      console.log( this.character === 'Merlin' );
      if ( ( ( !this.state.team ) && ( this.character !== 'Oberon' ) ) ||
              ( this.character === 'Merlin' ) ) {
        console.log( 'merlin or bad men not oberon' );
        for ( let i = 0; i < e.length; ++i )
          this.state.is_bad_men[ e[ i ] ] = true;
      }
      else if ( this.character === 'Percival' ) {
        for ( let i = 0; i < e.length; ++i )
          this.state.is_Merlin[ e[ i ] ] = true;
      }
    } );
    // socket.on('',()=>{});


    socket.on( 'players', ( e ) => { this.setState( { players: e } ); } );
    this.submit = this.submit.bind( this );
  }
  new_round_reset() {
    this.show_tips( [ `Round${this.state.games_record.length + 1}` ] );
    for ( let i = 0; i < this.props.player_number; ++i )
      this.state.players_state[ i ] = 'none';
    this.setState( { players_state: this.state.players_state } );
  }
  vote( e ) {
    socket.emit( 'vote', e );
  }

  mission( e ) {
    socket.emit( 'mission', e );
  }

  players() {
    const p = this.state.players;
  }

  submit( e ) {
    const index = [];
    for ( let i = 0; i < this.props.player_number; ++i )
      index.push( i );
    assert( this.state.stage === 'choosingTeam' );
    const team = index.filter( ( v, i ) => this.state.players_state[ i ] === 'chosen' );
    console.log( 'team=', team );
    socket.emit( 'chosen_member', team );
    e.target.className = '';
  }

  show_tips( e ) {
    for ( let i = 0; i < e.length; ++i ) {
      console.log( 'Test msg', e );
      setTimeout( () => {
        console.log( 'a' );
        this.setState( { tips: [ 'tips', e[ i ] ] } );
      }, i * 5000 );
      setTimeout( () => {
        console.log( 'b' );
        this.setState( { tips: [ '', '' ] } );
      }, ( i + 1 ) * 4950 );
    }
  }

  stage_control_message() {


  }
  test( e ) {
    for ( let i = 0; i < e.length; ++i ) {
      console.log( 'Test msg', e );
      setTimeout( () => {
        console.log( 'a' );
        this.setState( { tips: [ 'tips', e[ i ] ] } );
      }, i * 5000 );
      setTimeout( () => {
        console.log( 'b' );
        this.setState( { tips: [ '', '' ] } );
      }, ( i + 1 ) * 4950 );
    }
  }
  render_test() {
    return;
  }

  stage_control() {
    if ( this.state.stage === 'voting' && !this.state.voted ) {
      return <div>
        <button type="button" className="btn btn-primary margin btn-lg"
          onClick={() => {
            socket.emit( 'vote', true );
            this.setState( { voted: true } );
          }}>Yes</button>
        <button type="button" className="btn btn-primary margin btn-lg"
          onClick={() => {
            socket.emit( 'vote', false );
            this.setState( { voted: true } );
          }}>No</button>
          </div>;
    }
    else if ( this.state.stage === 'missioning' && !this.state.voted ) {
      if ( this.state.mission_team_members.indexOf( this.state.index ) != -1 ) {
        return <div>
          <button type="button" className="btn btn-primary margin btn-lg"
            onClick={() => {
              socket.emit( 'mission', true );
              this.setState( { voted: true } );
            }}>Yes</button>
          <button type="button" className="btn btn-primary margin btn-lg"
            onClick={() => { // Merlin Percival Servant
              if ( this.state.character === 'Merlin' ||
                 this.state.character === 'Percival' ||
                 this.state.character === 'Servant' )
                this.show_tips( [ 'Good team cant make mission fail!' ] );
              else {
                socket.emit( 'mission', false );
                this.setState( { voted: true } );
              }
            }}>No</button>
        </div>;
      }
      return <p>Waiting other people who taking the mission...</p>;
    }
    else if ( this.state.stage === 'choosingTeam' ) {
      if ( this.state.ID === this.state.leader ) {
        return <div>
            <button type="button"
              onClick={( e ) => { this.submit( e ); } }
              className={this.state.ID === this.state.leader ? 'btn btn-primary margin btn-lg ' + 'blue' : 'btn btn-primary margin btn-lg' } >
              Submit</button>
          </div>;
      }
    }
    else if ( this.state.stage === 'choosingMerlin' && this.state.character === 'Assassin' ) {
      return <div>
          <button type="button"
            onClick={( e ) => {
              const idx = this.state.players_state.indexOf( 'chosen' );
              socket.emit( 'accassin', idx );
              console.log( 'accassin', idx );
            } }
            className={'btn btn-primary blue' } >
            Submit</button>
        </div>;
    }

    return;
  }
  player_own_photo_onclick( e ) {
    const i = this.state.index;
    if ( this.state.players_state[ i ] === 'none' )
      this.state.players_state[ i ] = 'chosen';
    else if ( this.state.players_state[ i ] === 'chosen' )
      this.state.players_state[ i ] = 'none';
    else
        assert( 0 );
    this.setState( { players_state: this.state.players_state } );
  }

  character_explaination() {
    if ( !this.state.show_explaination )
      return;
    let text;
    if ( this.state.character === 'Merlin' )
      text = 'You Know Who Is Evel! Hide your character...';
    else if ( this.state.character === 'Percival' )
      text = 'You know who are Merlin amd Morgana';
    else if ( this.state.character === 'Assassin' )
      text = 'Find Merlin and kill him!';
    else if ( this.state.character === 'Mordred' )
      text = 'Merlin dont know you!';
    else if ( this.state.character === 'Oberon' )
      text = 'Your companions dont know you!';
    else if ( this.state.character === 'Morgana' )
      text = 'Percival doesnt know who is you or Merlin.';
    else if ( this.state.character === 'Servant' )
      text = 'Try to make mission success!';
    else if ( this.state.character === 'Minion' )
      text = 'Try to fail the missions with you companions!';
    return <div className={'character_explaination'} onClick={() => this.setState( { show_explaination: false } )}>
      <div className={'character_explaination_div'} >
        {text}
      </div>
    </div>;
  }

  render() {
    const render_player = this.state.players.map( ( v, i ) => (
        <div key={i} onClick={( e ) => {
          if ( ( this.state.stage === 'choosingTeam' ) && this.state.leader === this.state.ID ) {
            if ( this.state.players_state[ i ] === 'none' )
              this.state.players_state[ i ] = 'chosen';
            else if ( this.state.players_state[ i ] === 'chosen' )
              this.state.players_state[ i ] = 'none';
            else
                assert( 0 );
            this.setState( { players_state: this.state.players_state } );
          }
          else if ( this.state.stage === 'choosingMerlin' || this.state.character === 'Assassin' ) {
            console.log( 'player is onclick' );
            if ( this.state.players_state[ i ] === 'none' ) {
              console.log( 'none?' );
              for ( let j = 0; j < this.state.players_state.length; ++j )
                this.state.players_state[ j ] = 'none';
              this.state.players_state[ i ] = 'chosen';
              this.setState( { players_state: this.state.players_state } );
            }
            else if ( this.state.players_state[ i ] === 'chosen' ) {
              this.state.players_state[ i ] = 'none';
              this.setState( { players_state: this.state.players_state } );
            }
          }
        }} >
          <Player
          id={i}
          name={v}
          is_leader={this.state.stage === 'choosingTeam' && this.state.leader === v}
          players_state={this.state.players_state[ i ]}
          is_Merlin={this.state.is_Merlin[ i ]}
          is_bad_men={this.state.is_bad_men[ i ]}
          >
          </Player>
        </div>
    ) );
    const sorted_players = [];
    for ( let i = this.state.index; i < this.state.index + this.state.players.length; ++i )
      sorted_players.push( render_player[ i % this.state.players.length ] );

    const filtered_sorted_render = sorted_players.filter( ( v, i ) => i );

    return (
      <div className="container app" >

        <div className="row">
          <div className="col-xs-9">
            { filtered_sorted_render }
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
                ID={this.state.ID}
                character={this.state.character}
                games_record={this.state.games_record}
                stage={this.state.stage}
                className={this.state.players_state[ this.state.index ]}
                onclick={this.player_own_photo_onclick.bind( this )}
                is_leader={this.state.stage === 'choosingTeam' && this.state.ID === this.state.leader}
                change_show_explaination={() => this.setState( { show_explaination: true } )}
              ></PlayerOwn>
              {this.character_explaination.bind( this )()}
            </div>

            <div>
              {this.stage_control()}
              <div className={this.state.tips[ 0 ]} >
                {this.state.tips[ 1 ]}
              </div>
            </div>
          </div>
          <div className="col-xs-2">

          </div>

        </div>
      </div> );
  }

}

export default App;
