const socket = io();
let ID;
socket.on( 'register', id => { ID = id; console.log( 'client ID=', ID ); } );
socket.on( 'ready', e => { console.log( e ); } );

function b() {
  console.log( 'testB' );
}
//   socket.on('news', function (data) {
//     console.log(data);
//     socket.emit('my other event', { my: 'data' });
// });
//   console.log('client ID=',socket.id);
//     socket.on('res',function(d) {
//     console.log(d);
//     console.log('d');
//   socket.emit('say', { name: 'yoyo' });
//   });
//     socket.emit('say', { name: 'yoyo' });
// var a='opopopo';
