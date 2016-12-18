import { Router } from 'express';
import path from 'path';
import assert from 'assert';

const returnRouter = function ( io ) {
  const router = new Router();

  router.use( ( req, res ) => {
    res.sendFile( path.join( __dirname, 'game.html' ) );
  } );

  // function assert( condition, message ) {
  //   if ( !condition )
  //     throw message || 'Assertion failed';
  // }


  const allClients = []; // store socket.id
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
  // function* games() {
  //   console.log( 'generator' );
  //   // while(!end()) {
  //   //   console.log('generator fuck');
  //   //   yield 'fuck';
  //   // }
  //   while ( !end() ) {
  //     console.log( 'new round' );
  //     assert( stage === 'not begin' || stage === 'mission_complete' );
  //     yield assign_leader();
  //     assert( stage === 'voting' );
  //     yield asign_mission_member_and_vote();
  //     assert( stage === 'missioning' );
  //     yield mission_assign();
  //     aseert( stage === 'mission_complete' );
  //     yield inform_outcome();
  //   }
  // }
// io.to(socket.id).emit("event", data);
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
    
    for ( let i = 0; i < allClients.length; ++i )
      io.to( allClients[ i ] ).emit( 'character', characters[ i ] );
  }

  io.sockets.on( 'connection', ( socket ) => {
    console.log( 'connection', socket.id );
    // socket.emit('index',allClients.length);
    allClients.push( socket.id );
    socket.emit( 'myid', socket.id );
    if ( allClients.length === 3 ) {
      io.emit( 'start', allClients );
      set_index();
      set_characters();
      console.log( 'assign_leader' );
      leader_idx = Math.floor( Math.random() * allClients.length );
      io.emit( 'assign_leader', allClients[ leader_idx ] );
      leader = allClients[ leader_idx ];
      stage = 'choosingTeam';
    }

    socket.on( 'chosen_member', ( e ) => {
      console.log( 'asign_mission_member_and_vote' );
      console.log( 'chosen_memberRRR', stage, socket.id, leader );
      console.log( 'assign_mission_member_and_vote', e );
      assert( socket.id === leader );
      assert( stage === 'choosingTeam' );

      io.emit( 'assign_mission_member_and_vote', e );
      stage = 'voting';
    } );

    socket.on( 'vote', ( e ) => {
      assert( stage === 'voting' );
      if ( e )
        ++votes;
      else
        --votes;
      if ( ++vote_counter === allClients.length ) {

        console.log( 'vote end' );
        if ( votes >= 0 ) {
          console.log( 'inform_voting_outcome' );
          io.emit( 'inform_voting_outcome', true );
          stage = 'missioning';
        }
        else {
          io.emit( 'inform_voting_outcome', false )
          setTimeout(()=>io.emit( 'assign_leader', allClients[ leader_idx ] ),6000);
          console.log( 'assign_leader' );
          leader_idx = ( leader_idx + 1 ) % allClients.length;
          leader = allClients[ leader_idx ];
          ;
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
        io.emit( 'inform_mission_outcome', votes > 0 ? true : false );
        games_record.push( votes >= 0 ? true : false );
        const outcome = end();
        if ( outcome )
        {
          setTimeout(()=>io.emit( 'game_over', outcome ),5000);
          return
        }
        console.log( 'assign_leader' );
        leader_idx = ( leader_idx + 1 ) % allClients.length;
        leader = allClients[ leader_idx ];
        setTimeout(()=>io.emit( 'assign_leader', allClients[ leader_idx ] ),10000);
        stage = 'choosingTeam';
        votes = vote_counter = 0;
      }
    } );

    socket.on('accassin',(e)=>{
      if(characters[e]==='Merlin')
        io.emit('accassin',true);
      else
        io.emit('accassin',false);
    });

    socket.on( 'disconnect', () => {
      // console.log('');
      console.log( 'disconnect', socket.id );
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
