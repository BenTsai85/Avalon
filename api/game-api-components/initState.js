import State from './State';

const assert = require( 'assert' );

class initState extends State {
  constructor( gameapp ) {
    super();
    this.statename = 'initState';
    this.gameapp = gameapp;
    this.initCharacters();
    this.gameapp.io.on( 'connection', socket => {
      socket.on( 'username', username_ => {
        let username;
        if ( username_ === 'test' ) {
          username = socket.id;
          socket.emit( 'setState', { username } );
        }
        else
          username = username_;
        const idx = this.gameapp.allUsername.indexOf( username );
        if ( idx !== -1 )
          this.gameapp.allUserSocketId[ idx ] = socket.id;
        else
          this.addUser( username, socket.id );
        console.log( 'this.gameapp.username:', this.gameapp.allUsername );
        console.log( 'this.gameapp.allUserSocketId:', this.gameapp.allUserSocketId );
      } );
      socket.on( 'disconnect', () => {
        const idx = this.gameapp.allUserSocketId.indexOf( socket.id );
        // this.gameapp.allUserSocketId.splice( idx, 1 );
        // this.gameapp.allUserSocketId.splice( idx, 1 );
        // if( !this.gameapp.allUserSocketId.length )
        //   this.gameapp.resetAll();
      } );
    } );
  }

  initCharacters = () => {
    if ( this.gameapp.playerNumber === 3 )
      this.gameapp.characters = [ 'Merlin', 'Assassin', 'Percival' ];
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
  };

  addUser = ( username, socketID ) => {
    this.gameapp.allUsername.push( username );
    this.gameapp.allUserSocketId.push( socketID );
    if ( this.gameapp.allUsername.length === this.gameapp.playerNumber ) {
      for ( let characterIdx = 0; characterIdx < this.gameapp.playerNumber; characterIdx += 1 )
        this.setSkill( characterIdx );
      this.gameapp.initAllStateAndPlayers();
      const state = 'choosingTeamState';
      this.gameapp.io.emit( 'setState', { state } );
      this.gameapp.setState( this.gameapp.choosingTeamState );
    }
  };

  setSkill = characterIdx => {
    const character = this.gameapp.characters[ characterIdx ];
    const socket = this.gameapp.allUserSocketId[ characterIdx ];
    console.log("setSkill", character);
    this.gameapp.io.to( socket ).emit( 'setState', {
      character,
    } );
    if ( character === 'Merlin' )
      this.gameapp.io.to( socket ).emit( 'setState', {
        isVillain: this.gameapp.isVillainForMerlin(),
      } );
    else if ( character === 'Percival' ) {
      this.gameapp.io.to( socket ).emit( 'setState', {
        isMerlin: this.gameapp.isMerlin(),
      } );
      console.log( "Percival", "isMerlin", this.gameapp.isMerlin() );
    }
    else if ( character === 'Assassin' ||
              character === 'Mordred' ||
              character === 'Morgana' ||
              character === 'Minion' )
      this.gameapp.io.to( socket ).emit( 'setState', {
        isVillain: this.gameapp.isVillainForVillains(),
      } );
    else if ( character !== 'Servant' ) {
      assert( 0 );
    }
  };


}

export default initState;
