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
    socket.on( 'setHumidity', Humidity => io.emit( 'setHumidity', Humidity ) );
    socket.on( 'setTemperature', Temperature => io.emit( 'setTemperature', Temperature ) );
    socket.on( 'RFID', RFID => io.emit( 'RFID', RFID ) );
   } );


  router.post( '/setHumidity', ( req, res ) => {
    console.log('/setHumidity');
    const { Hunmidity } = req.body;
    io.emit( 'setHunmidity', Hunmidity );
    console.log(100);
    res.json( { test:9487 } );
  } );


  router.post( '/setTemperature', ( req, res ) => {
    console.log('/setTemperature');
    const { Temperature } = req.body;
    io.emit( 'setTemperature', Temperature );
    console.log(200);
    res.json( { test:9487 } );
  } );

  router.get( '/predict', async ( req, res ) => {
    const weathers = await Weather.findAll( {
      limit: 8,
      order: [
        [ 'updatedAt', 'DESC' ]
      ],
    } );
    const temp = weathers.map( w => w.temperature );
    const humi = weathers.map( w => w.humidity );
    res.json( { predictTemperatur: temp, predictHumidity: humi } );
  } );

  router.post( '/saveWeatherPerHour', ( req, res ) => {
    const { Temperature, Humidity } = req.body;
    const weather = await Weather.create( {
      temperature: Temperature,
      humidity: Humidity,
    } );
    console.log('weather',Weather);
  } );





  router.post( '/RFID', ( req, res ) => {
    console.log('/RFID');
    const { RFID } = req.body;
    io.emit( 'RFID', RFID );
    res.json( { test:9487 } );
  } );

  router.post( '/Number', ( req, res ) => {
    console.log('/RFID');
    const { Number } = req.body;
    io.emit( 'Number', Number );
    res.json( { test:9487 } );
  } );

  router.get( '/surplus', ( req, res ) => {
    res.json( { surplus: 9999 } );
  } );

  router.post( '/deposit', ( req, res ) => {
    const { deposit } = req.body;
    console.log( 'deposit', deposit );
  } );




  router.post( '/', ( req, res ) => {
    gamerooms.push( { roomname: 'default room', player_num: 1, max_player_num: 10, id: gamerooms.length } );
    res.json( gamerooms.length );
  } );
  return router;
};

module.exports = returnRouter;
