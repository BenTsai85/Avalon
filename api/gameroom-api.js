import { Router } from 'express';
import path from 'path';
import assert from 'assert';

const returnRouter = function ( io ) {

	const router = new Router();

	router.get( '*' , ( req, res ) => {
		res.sendFile( path.join( __dirname, 'gameroom.html' ) );
	});


	var gameroom_players_setting=[];
	var gameroom_socketid=[];
	//{name, img, ready?, ifchief?}
	
  	var gameroom = io.of('/gameroom');
	gameroom.on( 'connection', ( socket ) => {
	    console.log( 'GAMEROOM', socket.id );
	    gameroom_socketid.push(socket.id);

	    socket.on( 'gameroom_connect' ,async msg=>{
	    	await gameroom_players_setting.push(msg);
	    	gameroom_players_setting[0].is_chief=true;
	    	gameroom.emit( 'set_gameroom_players_setting', gameroom_players_setting);
	    	console.log('gameroom_connect',gameroom_players_setting);
	    });

	    socket.on( 'set_is_ready' ,msg=>{
	    	console.log('set ready:',gameroom_players_setting);
	    	const idx = gameroom_socketid.indexOf(socket.id);
	    	gameroom_players_setting[idx].is_ready=msg;
	    	gameroom_players_setting[0].is_chief=true;
	    	gameroom.emit( 'set_gameroom_players_setting' ,gameroom_players_setting );
	    	console.log('set ready:',gameroom_players_setting);
	    });
	    socket.on( 'game_start', e=>{
	    	gameroom.emit('game_start','');
	    });

	    socket.on( 'talk', msg=>socket.broadcast.emit( 'talk', msg ));
	    socket.on( 'disconnect', () => {
		    console.log( 'disconnect', socket.id );
		    const idx = gameroom_socketid.indexOf(socket.id);
		    gameroom_players_setting.splice(idx,1);
		    gameroom_socketid.splice(idx,1);
		    if(gameroom_players_setting.length>=1)
			    gameroom_players_setting[0].is_chief=true;
		    gameroom.emit( 'set_gameroom_players_setting' ,gameroom_players_setting );
	    } );

  	} );
  return router;
};

module.exports = returnRouter;
