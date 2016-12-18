

//= ====================================
// Env. setting
//= ====================================

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config_login from './webpack-login.config';
import config_game from './webpack-game.config';
import multer from 'multer';
const upload = multer( { dest: 'inclasshackathon/uploads/' } );

const bodyParser = require( 'body-parser' );

const port = process.env.PORT || 3000;

const app = express();
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );

const compiler_login = webpack( config_login );
const compiler_game = webpack( config_game );

app.use( require( 'webpack-dev-middleware' )( compiler_login, {
  publicPath: config_login.output.publicPath,
  stats: {
    colors: true,
  },
} ) );
app.use( require( 'webpack-dev-middleware' )( compiler_game, {
  publicPath: config_game.output.publicPath,
  stats: {
    colors: true,
  },
} ) );


//= ====================================
// Sign Up & Login
//= ====================================

import userdata from './user';

app.post( '/api/signup', upload.single( 'icon' ), ( req, res ) => {
  userdata.signup( req.body.username, req.body.password, req.body.email, req.file );
  res.send( 'success' );
} );

app.post( '/api/login', upload.single(), ( req, res ) => {
  res.send( userdata.login( req.body.username, req.body.password ) );
} );

app.post( '/api/checkName', upload.single(), ( req, res ) => {
  res.json( { success: userdata.checkName( req.body.username ) } );
} );

app.get( '/', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'login.html' ) );
} );


//= ====================================
// Game
//= ====================================


import http from 'http';
const server = http.createServer( app );
const io = require( 'socket.io' ).listen( server );  // pass a http.Server instance
server.listen( port );  // listen on port 3000

const game = require( './game-api' );
app.get( '/game', game( io ) );
