

//= ====================================
// Env. setting
//= ====================================

import path from 'path';
import express from 'express';
import session from 'express-session';
import webpack from 'webpack';
import config_login from './webpack-login.config';
import config_game from './webpack-game.config';
import config_gameroom from './webpack-gameroom.config';
import config_gamelobby from './webpack-gamelobby.config';
import multer from 'multer';
const upload = multer( { dest: 'inclasshackathon/uploads/' } );

const bodyParser = require( 'body-parser' );

const port = process.env.PORT || 3000;

const app = express();

app.use( session( {
  secret: 'keyboard cat',
  cookie: {},
} ) );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );

const compiler_login = webpack( config_login );
const compiler_game = webpack( config_game );
const compiler_gameroom = webpack( config_gameroom );
const compiler_gamelobby = webpack( config_gamelobby );

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

app.use( require( 'webpack-dev-middleware' )( compiler_gameroom, {
  publicPath: config_gameroom.output.publicPath,
  stats: {
    colors: true,
  },
} ) );

app.use( require( 'webpack-dev-middleware' )( compiler_gamelobby, {
  publicPath: config_gameroom.output.publicPath,
  stats: {
    colors: true,
  },
} ) );

//= ====================================
// Sign Up & Login
//= ====================================
import auth from './api/auth.js';
app.use( '/api/auth', auth );

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

import game from './api/game-api';
app.use( '/game', game( io ) );

import gameroom from './api/gameroom-api';
app.use( '/gameroom', gameroom( io ) );

import gamelobby from './api/gamelobby-api';
app.use( '/gamelobby', gamelobby( io ) );

import api from './api/api';
app.use( '/api', api );
