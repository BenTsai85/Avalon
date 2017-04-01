import State from './State';
import initState from './initState';
import votingState from './votingState';
import missionState from './missionState';
import choosingTeamState from './choosingTeamState';
import accassinState from './accassinState';


const assert = require( 'assert' );

class GameApp {
  constructor( playerNumber = 3, io ) {
    if ( !io )
      return;
    this.io = io;
    this.allUserSocketId = [];
    this.allUsername = [];
    this.gamesRecord = []; // success meas 1 , fail means 0
    this.voteRecordList = [];
    this.leaderIdx = -1; // store leader idx
    this.missionMemberArray = []; // isMember, true or false
    this.characters = [];
    this.playerNumber = playerNumber;
    this.missionMemberNumberList = [ 2, 2, 2, 2, 2 ];
    this.initState = new initState( this );
    this.votingState = new votingState( this );
    this.missionState = new missionState( this );
    this.choosingTeamState = new choosingTeamState( this );
    this.accassinState = new accassinState( this );
    this.state = this.initState;
    this.voteRecord = []; // agree,veto
    this.missionVetoNumberRecord = [];
    this.io.on( 'connection', socket => {
      socket.on( 'msg', msg => console.log( msg ) );
    } );
    this.io.emit('msg','msg test');
  }

  resetAll = e => {

  };

  setState = newState => {
    // console.log("setState",newState);
    this.state = newState;
    this.state.initTheState();
  };

  initAllStateAndPlayers = e => {
    console.log("initAllStateAndPlayers");
    this.io.emit( 'setState', {
      players: this.allUsername
    } );
  };

  isVillainForMerlin = () => this.characters.map( character => (
        character === 'Assassin' ||
        character === 'Mordred' ||
        character === 'Oberon' ||
        character === 'Morgana' ||
        character === 'Minion' ) );

  isVillainForVillains = () => this.characters.map( character => (
        character === 'Assassin' ||
        character === 'Mordred' ||
        character === 'Morgana' ||
        character === 'Minion' ) );

  isMerlin = () => this.characters.map( character => (
        character === 'Morgana' ||
        character === 'Merlin' ) );
}

const gmaeapp = new GameApp();

export default GameApp;
