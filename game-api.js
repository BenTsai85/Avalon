import { Router } from 'express';
import path from 'path';

const returnRouter = function ( io ) {
  const router = new Router();

  router.use( ( req, res ) => {
    res.sendFile( path.join( __dirname, 'game.html' ) );
  } );

  console.log( 1 );

  const allClients = [];
  const games = [];// success meas 1 , fail means 0
  const leader = 0;

  function broadcast( value, command ) {
    console.log( 'broadcast', command );
    for ( let i = 0; i < allClients.length; ++i ) {
      const socketid = allClients[ i ];
      io.to( socketid ).emit( command, value );
    }
  }
  function allocate( s ) {
    for ( let i = 0; i < allClients.length; ++i ) {
      const socketid = allClients[ i ];
      io.to( socketid ).emit( 'message', i );
      console.log( 'allo', i );
    }
  }

  function end() {
    console.log( 'check end' );
    let success = 0;
    let fail = 0;
    for ( let i = 0; i < games.length; ++i ) {
      if ( game[ i ] )
        ++success;
      else
        ++fail;
    }
    if ( fail === 3 )
      return -1;
    else if ( success === 3 )
      return 1;
    else
      return 0;
  }
  function asign_Leader() {
    console.log( 'asign_Leader' );
    broadcast( allClients[ 0 ], 'asign_Leader' );
    // io.socket.broadcast.emit('msg','asign_Leader');
    return true;
  }
  function vote() {
    console.log( 'vote' );
    let counter = 0;
    let vote = 0;
    io.sockets.on( 'vote', e => {
      ++counter;
      vote += e;
    } );
    if ( counter == 3 ) {
      if ( vote == 2 )
        return true;
      else
        return false;
    }
  }
  function mission() {
    console.log( 'mission' );
    let counter = 0;
    let mission = 0;
    io.sockets.on( 'vote', e => {
      ++counter;
      mission += e;
    } );
    if ( counter == 3 ) {
      if ( mission == 2 )
        return true;
      else
        return false;
    }
  }
  // socket.broadcast.emit
    // var promise = new Promise((resolve)=>{
    //   resolve('none');
    // });

    // let p1 = promise.then((v)=>{
    // let x='bitch';
    // setTimeout(
    // () => {
    //     console.log(v);
    //     x='haha';
    // }, 5000);
    // return x;
    // });

    // let p2 = p1.then((v)=>{
    //   console.log(v+'p2');
    // });


  function playing() {
    const promise = new Promise( resolve => {
      resolve( 'none' );
    } );
    while ( !end() ) {
      console.log( promise );
      promise.then( v => asign_Leader() )
      .then( v => console.log( v ) );
      break;
      // .then((v)=>{
      //   vote();
      // ;})
      // .then((v)=>{
      //   mission();
      // ;})
    }
  }

  io.sockets.on( 'connection', socket => {
    allClients.push( socket.id );
    socket.emit( 'myid', socket.id );
    // socket.broadcast.emit('msg',allClients);
    if ( allClients.length === 3 ) {
      socket.broadcast.emit( 'start', allClients );
      socket.emit( 'start', allClients );
      console.log( 'start' );
      playing();
    }
    socket.on( 'disconnect', () => {
      const idx = allClients.indexOf( socket.id );
      const msg = socket.id;
      allClients.splice( idx, 1 );
      socket.broadcast.emit( 'msg', `${msg}  leave` );
    } );
  //   socket.on('a',(e)=>{
  //     console.log(e);
  //     socket.emit('b', { hello: 'world' });
  //     socket.broadcast.emit('c','broadcast');
  //   })
  } );
  const socketid = allClients[ 0 ];
    // io.to(socketid).emit('message', 0);
  // var connectedNumber = 0;
  // io.on('connection', function (socket) {
  //   connectedNumber = connectedNumber + 1;
  //   // socket.emit('news', { hello: 'world' });
  //   // socket.on('my other event', function (data) {
  //   //   console.log(data);
  //   // });
  //   // socket.on('click',function(d) {
  //   //   console.log(d);
  //   // });
  //   socket.emit('register',connectedNumber );
  //   socket.on('vote',(d)=>{console.log(d);});
  //   socket.on('disconnection',()=>{--connectedNumber;console.log()});

  // });
  // // io.to(socketid).emit('message', 'for your eyes only')
  // // io.sockets.connected[socketid].emit('message', 'for your eyes only');
  // io.on('click',function(socket) {
  //   socket.on('click',function(d) {
  //     console.log(d);
  //   });
  // });
  // socket.on('vote',(d)=>{console.log(d);})

  return router;
};

module.exports = returnRouter;
