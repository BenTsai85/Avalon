

//= ====================================
// Env. setting
//= ====================================

import express from 'express';
import session from 'express-session';
import webpack from 'webpack';
import config from './webpack.config';

const port = process.env.PORT || 3000;

const app = express();

app.use( session( {
  secret: 'keyboard cat',
  path: '/',
  httpOnly: true,
  resave: true,
  saveUninitialized: false,
} ) );

const compiler = webpack( config );

app.use( require( 'webpack-dev-middleware' )( compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
} ) );


//= ====================================
// Sign Up & Login
//= ====================================
import auth from './api/auth';
app.use( '/auth', auth );

import http from 'http';
const server = http.createServer( app );
const io = require( 'socket.io' ).listen( server );  // pass a http.Server instance
server.listen( port );  // listen on port 3000

import api from './api/api';
app.use( '/', api( io ) );
