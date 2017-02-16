import { Router } from 'express';
import path from 'path';
import models from '../src/models';
import game from './game-api';
import gameroom from './gameroom-api';
import gamelobby from './gamelobby-api';

const { User } = models;

const returnRouter = function ( io ) {
  const router = new Router();

  router.get( '/api/gamelobby', async ( req, res ) => {
    try {
      const user = await User.findById( req.session.loggedInUserId );
      res.json( user );
    }
    catch ( err ) {
      console.error( err );
    }
  } );

  router.use( game( io ) );

  router.use( gameroom( io ) );

  router.use( gamelobby( io ) );

  router.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../index.html' ) );
  } );

  return router;
};

module.exports = returnRouter;
