import State from './State';
import votingState from './votingState';

const assert = require( 'assert' );

class choosingTeamState extends State {
  constructor( gameapp ) {
    super();
    this.statename = '';
    this.gameapp = gameapp;
    this.missionMemberNum = 0;
    this.gameapp.io.on( 'connection', socket => {
      socket.on( 'missionMemberArray', missionMemberArray => {
        console.log("missionMemberArray", missionMemberArray);
        let counter = 0;
        for ( let idx = 0; idx < missionMemberArray.length; idx += 1 )
          if ( missionMemberArray[ idx ] )
            counter += 1;
        assert( counter === this.missionMemberNum );
        this.chooseTeamMembers( missionMemberArray );
      } );
    } );
  }

  initTheState = () => {
    this.assignLeader();
  };

  assignLeader = () => {
    let leaderIdx;
    if ( this.gameapp.leaderIdx === -1 )
      leaderIdx = Math.floor( Math.random() * this.gameapp.playerNumber );
    else
      leaderIdx = ( this.gameapp.leaderIdx + 1 ) % this.gameapp.playerNumber;
    this.gameapp.leaderIdx = leaderIdx;
    const leaderUsername = this.gameapp.allUsername[ leaderIdx ];
    const recodLength = this.gameapp.gamesRecord.length;
    this.missionMemberNum = this.gameapp.missionMemberNumberList[ recodLength ];
    const missionMemberNum = this.missionMemberNum;
    this.gameapp.io.emit( 'setState', { leaderUsername, missionMemberNum } );
  };

  chooseTeamMembers = missionMemberArray => {
    this.gameapp.missionMemberArray = missionMemberArray;
    const state = 'votingState';
    const playerState = missionMemberArray.map( isMember => ( isMember ? 'chosen' : 'none' ) );
    console.log("this.gameapp.io.emit( 'setState', { playerState, state } );");
    this.gameapp.io.emit( 'setState', { playerState, state } );
    this.gameapp.setState( this.gameapp.votingState );
  };
}

export default choosingTeamState;
