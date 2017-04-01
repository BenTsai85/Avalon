import { Router } from 'express';
import path from 'path';
import assert from 'assert';
import GameApp from './game-api-components/GameApp';


const returnRouter = function ( io ) {
  const router = new Router();
  let gameio = io.of( '/game' );
  gameio = io;
  const gameapp = new GameApp( 3, gameio );
  router.use( ( req, res ) => {
    res.sendFile( path.join( __dirname, 'game.html' ) );
  } );

  gameio.on( 'connection', ( socket ) => {
    socket.on( 'disconnect', () => {
    } );
  } );


  return router;
};

module.exports = returnRouter;
