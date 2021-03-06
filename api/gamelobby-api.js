import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';

const { User } = models;
const returnRouter = function ( io ) {
  const router = new Router();


  const gamerooms = [ { roomname: 'defaul troom', player_num: 2, max_player_num: 5, id: 0 }, { roomname: 'defaul troom', player_num: 2, max_player_num: 5, id: 1 } ];
  const players = [ 'default1', 'defaul2' ];
  const socketid = [ 'd', 'd' ];

  router.post( '/', ( req, res ) => {
    gamerooms.push( { roomname: 'default room', player_num: 1, max_player_num: 10, id: gamerooms.length } );
    res.json( gamerooms.length );
  } );

  const gamelobby = io.of( '?' );
  io.on( 'connection', ( socket ) => {
    socket.emit( 'set_gamerooms', gamerooms );
    socket.emit( 'set_players', players );
    socket.on( 'player_connect', ( msg ) => {
      console.log( 'con', players, socketid, socket.id );
      players.push( msg );
      socketid.push( socket.id );
      gamelobby.emit( 'set_players', players );
      console.log( 'con', players, socketid, socket.id );
    } );
	    socket.on( 'talk', msg => socket.broadcast.emit( 'talk', msg ) );
	    socket.on( 'disconnect', () => {
      const idx = socketid.indexOf( socket.id );
      if ( idx === -1 )
        return;
      if ( idx === 0 || idx === 1 )			{
        console.log( idx, socketid, socket.id, players );
        console.log( 'fuckout' );
      }
      socketid.splice( idx, 1 );
      console.log( 'dis', players, socketid, socket.id );
      players.splice( idx, 1 );
      console.log( 'dis', players, socketid, socket.id );
      gamelobby.emit( 'set_players', players );
	    } );
  	} );
  return router;
};

module.exports = returnRouter;
