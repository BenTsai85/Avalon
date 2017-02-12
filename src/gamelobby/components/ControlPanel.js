import React, { Component } from 'react';
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
    };
  }
  componentWillMount() {
    const gameroom = io( 'http://localhost:3000/gamelobby' );
    gameroom.on( 'enter_the_gameroom', ( msg ) => {
      this.setState( { member: this.state.member } );
    } );
  }

  create_new_room = () => {
    console.log( 'create' );
    fetch( '/gamelobby', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( {} ),
      credentials: 'same-origin',
    } ).then( res => res.json() )
        .then( ( res ) => {
          console.log( 'res:', res );
          document.location.href = ( '/gameroom' );
        } )
        .catch( err => console.log( err ) );
  }

  render() {
    return <div>
        <div className="row">
          <button type="button" onClick={() => this.create_new_room()} className="btn btn-default">Audo enter</button>
        </div>
        <div className="row">
          <button type="button" onClick={() => this.create_new_room()} className="btn btn-default">Create a gameroom</button>
        </div>
      </div>;
  }
}

export default App;
