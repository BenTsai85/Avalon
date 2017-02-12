import State from './State';

const assert = require( 'assert' );

class initState extends State {
  constructor( gameapp ) {
    super();
    this.gameapp = gameapp;
    this.initCharacters = this.initCharacters.bind( this );
    this.addUser = this.addUser.bind( this );
    this.setSkill = this.setSkill.bind( this );
    
  }

  initCharacters( playerNumber ) {
    this.gameapp.playerNumber = playerNumber;
    if ( playerNumber === 3 )
      this.gameapp.characters = [ 'Merlin', 'Assassin', 'Servant' ];
    else
      assert( 0 );
    const shuffle = this.gameapp.characters;
    let tmp;
    let i = 3;
    while ( i !== 0 ) {
      const s = Math.floor( Math.random() * i );
      tmp = shuffle[ s ];
      i -= 1;
      shuffle[ s ] = shuffle[ i ];
      shuffle[ i ] = tmp;
    }
    this.gameapp.characters = shuffle;
  }

  addUser( username, socketID ) {
    this.gameapp.allUsername.push( username );
    this.gameapp.allUserSocketId.push( socketID );
    if ( this.gameapp.allUsername.length === this.gameapp.playerNumber ) {
      this.setSkill();
      this.gameapp.state = new this.gameapp.choosingTeamState();
    }
  }

  setSkill( character ) {
    console.log( 'setSkill not done!' );
  }


}

export default initState;
