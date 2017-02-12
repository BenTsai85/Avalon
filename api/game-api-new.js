
import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import 

const returnRouter = function ( io ) {
  var gameio = io.of('/game');
  const router = new Router();

  router.use( ( req, res ) => {
    res.sendFile( path.join( __dirname, 'game.html' ) );
  } );

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

  }

  io.on( 'connection', ( socket ) => {
    socket.on( 'player_number', ( n ) => {
    }

    socket.on( 'chosen_member', ( e ) => {
    });

    socket.on( 'vote', ( e ) => {
    } );

    socket.on( 'mission', ( e ) => {

      }
    } );

    socket.on( 'accassin', ( e ) => {
    } );

    socket.on( 'disconnect', () => {
  } );
  return router;
};

module.exports = returnRouter;
