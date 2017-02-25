import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';
import bodyParser from 'body-parser';


const { User } = models;
const returnRouter = function ( io ) {
  const router = new Router();
  router.use( bodyParser.urlencoded( { extended: false } ) );
  router.use( bodyParser.json() );
  
  io.on( 'connection', ( socket ) => {
    console.log("socket");
    socket.on( 'setHunmidity', Hunmidity => io.emit( 'setHunmidity', Hunmidity ) );
    socket.on( 'setTemperature', Temperature => io.emit( 'setTemperature', Temperature ) );
    socket.on( 'RFID', RFID => io.emit( 'RFID', RFID ) );
   } );


  router.post( '/setHunmidity', ( req, res ) => {
    const { Hunmidity } = req.body;
    io.emit( 'setHunmidity', Hunmidity );
  } );


  router.post( '/setTemperature', ( req, res ) => {
    const { Temperature } = req.body;
    io.emit( 'setTemperature', Temperature );
  } );

  router.post( '/RFID', ( req, res ) => {
    const { RFID } = req.body;
    io.emit( 'RFID', RFID );
  } );

  router.post( '/', ( req, res ) => {
    gamerooms.push( { roomname: 'default room', player_num: 1, max_player_num: 10, id: gamerooms.length } );
    res.json( gamerooms.length );
  } );
  return router;
};

module.exports = returnRouter;
