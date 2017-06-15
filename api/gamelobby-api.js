import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import models from '../src/models';
import bodyParser from 'body-parser';
var spawn = require( 'child_process' ).spawn;

const { User } = models;
let datas = {
  name :['coke', '7up', 'apple juice'],
  time: [ [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
    "Thu Jun 11 2017 20:50:15 GMT+0800 (CST)"
  ], [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
  ], [
    "Thu Jun 15 2017 20:50:15 GMT+0800 (CST)",
    "Thu Jun 13 2017 20:50:15 GMT+0800 (CST)",
    "Thu Jun 13 20117 20:50:15 GMT+0800 (CST)"
  ] ],
};

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

  router.post( '/setTrade', ( req, res ) => {
    console.log('/setTrade');
    const { productName, tradeTime } = req.body;
    const idx = datas.name.indexOf(productName);
    datas.time[ idx ].push(tradeTime);
    io.emit( 'setTrade', req.body );
    res.json( { test:9999 } );
  } );

  router.post( '/setTemperature', ( req, res ) => {
    console.log('/setTemperature');
    const { Temperature } = req.body;
    io.emit( 'setTemperature', Temperature );
    console.log(200);
    res.json( { test:9487 } );
  } );

  router.get( '/record', async ( req, res ) => {
    const weathers = await Weather.findAll( {
      limit: 8,
      order: [
        [ 'updatedAt', 'DESC' ]
      ],
    } );
    const temp = weathers.map( w => w.temperature );
    const humi = weathers.map( w => w.humidity );
    res.json( { recordTemperature: temp, recordHumidity: humi } );
  } );

  router.get( '/getCommodityDatas', async ( req, res ) => {
    res.json( { datas } );
  } );

  router.post( '/setCommodityDatas', async ( req, res ) => {
    const { name, time } = req.body;
    const idx = datas.name.indexOf(name);
    datas.time[idx].push(time);
  } );



  router.post( '/saveWeatherPerHour', async ( req, res ) => {
    const { Temperature, Humidity } = req.body;
    const weather = await Weather.create( {
      temperature: Temperature,
      humidity: Humidity,
    } );
    console.log('weather',Weather);
  } );

  router.get( 'predict', async ( req, res ) => {
    const weathers = await Weather.findAll( {
      limit: 20,
      order: [
        [ 'updatedAt', 'DESC' ]
      ],
    } );
    const temp = weathers.map( w => w.temperature );
    const humi = weathers.map( w => w.humidity );
    var ls = spawn( 'python3', [ 'newtest.py', ...temp, ...humi ] );

    ls.stdout.on( 'data', ( data ) => {
      let th = data.split(',');
      return res.json( { predictTemperature: th[0], predictHumidity: th[1] } );
    } );
  } );




  router.post( '/RFID', ( req, res ) => {
    console.log('/RFID');
    const { RFID } = req.body;
    console.log( RFID );
    io.emit( 'RFID', RFID );
    res.json( { test:9487 } );
  } );

  router.post( '/Number', ( req, res ) => {
    console.log('/Number');
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
