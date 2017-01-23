import { Router } from 'express';
import path from 'path';
import assert from 'assert';

const returnRouter = function ( io ) {
  var gameio = io.of('/game');
  const router = new Router();

  router.use( ( req, res ) => {
    res.sendFile( path.join( __dirname, 'game.html' ) );
  } );

  // function assert( condition, message ) {
  //   if ( !condition )
  //     throw message || 'Assertion failed';
  // }


  const allClients = []; // store socket.id
  let player_number;
  let games_record = [];// success meas 1 , fail means 0
  let leader = 0; // store socket.id
  let leader_idx = -1;
  let stage = 'not begin'; // 'not begin','voting','missioning','choosingTeam','mission_complete'
  let mission_members = [];
  let votes = 0;
  let vote_counter = 0;
  let characters = [ 'Merlin', 'Assassin', 'Servant' ];
  function init() {
    games_record = [];// success meas 1 , fail means 0
    leader = 0; // store socket.id
    leader_idx = -1;
    stage = 'not begin'; // 'not begin','voting','missioning','choosingTeam','mission_complete'
    mission_members = [];
    votes = 0;
    vote_counter = 0;
  }

  function end() {
    let success = 0;
    let fail = 0;
    for ( let i = 0; i < games_record.length; ++i ) {
      if ( games_record[ i ] )
        ++success;
      else
      ++fail;
    }
    if ( success == 3 )
      return 1;
    else if ( fail == 3 )
      return -1;
    return 0;
  }

  function set_index() {
    for ( let i = 0; i < allClients.length; ++i )
      io.to( allClients[ i ] ).emit( 'index', i );
    console.log( 'set index' );
  }

  function set_characters() {
    // Merlin Percival Assassin Mordred Oberon Morgana Servant Minion
    const shuffle = [ 'Merlin', 'Assassin', 'Servant' ];
    let tmp,
      i = 3;
    while ( i !== 0 ) {
      const s = Math.floor( Math.random() * i );
      tmp = shuffle[ s ];
      --i;
      shuffle[ s ] = shuffle[ i ];
      shuffle[ i ] = tmp;
    }
    characters = shuffle;
    for ( let i = 0; i < allClients.length; ++i )
      io.to( allClients[ i ] ).emit( 'character', characters[ i ] );
  }

  function set_skill() {
    const bad_men_idx = [];
    for ( let i = 0; i < player_number; ++i ) {
      if ( characters[ i ] === 'Minion'
      || characters[ i ] === 'Assassin'
      || characters[ i ] === 'Mordred'
      || characters[ i ] === 'Oberon'
      || characters[ i ] === 'Morgana'
      )
        bad_men_idx.push( i );
    }

    for ( let i = 0; i < bad_men_idx.length; ++i ) {
      if ( characters[ bad_men_idx[ i ] ] !== 'Oberon' ) {
        io.to( allClients[ bad_men_idx[ i ] ] ).emit( 'set_skill', bad_men_idx );
        console.log( 'set_skill ,bad_men_idx=', bad_men_idx );
      }
    }

    let idx;
    const Mordred_idx = characters.indexOf( 'Mordred' );
    let bad_men_idx_except_Mordred = bad_men_idx;
    if ( Mordred_idx !== -1 )
      bad_men_idx_except_Mordred = bad_men_idx.splice( Mordred_idx, 1 );

    const Merlin_idx = characters.indexOf( 'Merlin' );
    io.to( allClients[ Merlin_idx ] ).emit( 'set_skill', bad_men_idx_except_Mordred );
    console.log( 'set_skill ,bad_men_idx_except_Mordred=', bad_men_idx_except_Mordred );

    idx = characters.indexOf( 'Percival' );
    io.to( allClients[ idx ] ).emit( 'set_skill', [ Mordred_idx, Merlin_idx ] );
    console.log( 'set_skill ,[ Mordred_idx, Merlin_idx ]=', [ Mordred_idx, Merlin_idx ] );
    console.log('characters=',characters);
  }

  io.on( 'connection', ( socket ) => {
    // console.log( 'connection_game', socket.id );
    // socket.emit('index',allClients.length);
    socket.on( 'player_number', ( n ) => {
      // console.log('player_number=',n);
      player_number = n;
    } );

    allClients.push( socket.id );
    socket.emit( 'myid', socket.id );
    console.log( 'allClients.length=', allClients.length );
    // console.log( 'player_number=', player_number );
    if ( allClients.length === player_number ) {
      io.emit( 'start', allClients );
      set_index();
      set_characters();
      set_skill();
      console.log( 'assign_leader' );
      leader_idx = Math.floor( Math.random() * allClients.length );
      io.emit( 'assign_leader', allClients[ leader_idx ] );
      leader = allClients[ leader_idx ];
      stage = 'choosingTeam';
    }

    socket.on( 'chosen_member', ( e ) => {
      console.log( 'asign_mission_member_and_vote' );
      console.log( 'chosen_member', stage, socket.id, leader );
      console.log( 'assign_mission_member_and_vote', e );
      console.log(socket.id, leader)
      assert( socket.id === leader );
      assert( stage === 'choosingTeam' );

      io.emit( 'assign_mission_member_and_vote', e );
      stage = 'voting';
      console.log('change stage to vote');
    } );

    socket.on( 'vote', ( e ) => {
      console.log('now stage should be voting. stage:',stage);
      assert( stage === 'voting' );
      if ( e )
        ++votes;
      else
        --votes;
      if ( ++vote_counter === allClients.length ) {
        console.log( 'vote end' );
        if ( votes >= 0 ) {
          console.log( 'inform_voting_outcome true change stage to missionning' );
          io.emit( 'inform_voting_outcome', true );
          stage = 'missioning';
        }
        else {
          io.emit( 'inform_voting_outcome false change stage to choosingteam', false );
          console.log( 'assign_leader' );
          leader_idx = ( leader_idx + 1 ) % allClients.length;
          leader = allClients[ leader_idx ];
          console.log('leader = ',leader);
          setTimeout( () => io.emit( 'assign_leader', allClients[ leader_idx ] ), 6000 );
          stage = 'choosingTeam';
        }
        votes = 0;
        vote_counter = 0;
      }
    } );

    socket.on( 'mission', ( e ) => {
      assert( stage === 'missioning' );
      if ( !e )
        --votes;
      if ( ++vote_counter === 2 ) {
        console.log('inform_mission_outcome, votes=',votes);
        io.emit( 'inform_mission_outcome', votes === 0 ? true : false );
        games_record.push( votes >= 0 ? true : false );
        const outcome = end();
        if ( outcome>0 ) {
          setTimeout( () => io.emit( 'game_over', outcome ), 5000 );
          return;
        }
        else if (outcome<0) {
          setTimeout( () => io.emit( 'game_over', outcome ), 5000 );
          return;
        }
        console.log( 'assign_leader' );
        leader_idx = ( leader_idx + 1 ) % allClients.length;
        leader = allClients[ leader_idx ];
        console.log('mission vote=,',votes,' leader=',leader);
        setTimeout( () => io.emit( 'assign_leader', leader, 10000 ) );
        stage = 'choosingTeam';
        votes = vote_counter = 0;
      }
    } );

    socket.on( 'accassin', ( e ) => {
      if ( characters[ e ] === 'Merlin' )
        io.emit( 'accassin', true );
      else
        io.emit( 'accassin', false );
    } );

    socket.on( 'disconnect', () => {
      // console.log('');
      // console.log( 'disconnect', socket.id );
      const idx = allClients.indexOf( socket.id );
      const msg = socket.id;
      allClients.splice( idx, 1 );
      socket.broadcast.emit( 'msg', `${msg}  leave` );
      init();
    } );
  //   socket.on('a',(e)=>{
  //     console.log(e);
  //     socket.emit('b', { hello: 'world' });
  //     socket.broadcast.emit('c','broadcast');
  //   })
  } );
  const socketid = allClients[ 0 ];
  return router;
};

module.exports = returnRouter;
