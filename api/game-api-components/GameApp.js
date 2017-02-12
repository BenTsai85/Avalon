import State from './State';
import initState from './initState';
import votingState from './votingState';
import missionState from './missionState';
import choosingTeamState from './choosingTeamState';
import accassinState from './accassinState';
import Client from './Client';

const assert = require( 'assert' );

class GameApp {
  constructor( playerNumber = 3 ) {
    this.initState = initState;
    this.votingState = votingState;
    this.missionState = missionState;
    this.choosingTeamState = choosingTeamState;
    this.accassinState = accassinState;

    this.State = new this.initState();
    this.allUserSocketId = [];
    this.allUsername = [];
    this.gamesRecord = []; // success meas 1 , fail means 0
    this.leaderUsername = 0; // store leader username
    this.missionMemberUsernames = [];
    this.characters = [];
    this.playerNumber = 0;
  }
}

const gmaeapp = new GameApp();
gmaeapp.addUser( 'user1', 'socket01' );
gmaeapp.addUser( 'user2', 'socket02' );
gmaeapp.addUser( 'user3', 'socket03' );

// export default GameApp;
