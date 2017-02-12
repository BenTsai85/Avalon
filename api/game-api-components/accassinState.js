import State from './State';

class accassinState extends State {
  constructor( gameapp ) {
    super();
    this.gameapp = gameapp;
  }

  accassin( victim ) {
    const idx = this.gameapp.allUsername.indexOf( 'victim' );
    if ( this.gameapp.characters[ idx ] === 'Merlin' )
      console.log( 'accassin success' );
    else
      console.log( 'accassin fail' );
  }
}

export default accassinState;
