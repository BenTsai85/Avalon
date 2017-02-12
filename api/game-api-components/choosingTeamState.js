import State from './State';

class choosingTeamState extends State {
  constructor( gameapp ) {
    super();
    this.gameapp = gameapp;
    this.assignLeader = this.assignLeader.bind( this );
  }

  assignLeader() {
    const leaderIdx = Math.floor( Math.random() * this.gameapp.playerNumber );
    this.gameapp.leaderUsername = this.gameapp.allUsername[ leaderIdx ];
    console.log( 'socket emit assignLeader!' );
    this.gameapp.state = new votingState();
  }

  chooseTeamMembers( missionMemberUsernames ) {
  	this.gameapp.missionMemberUsernames = missionMemberUsernames;
  	this.gameapp.state = new this.gameapp.votingState();
  }
}

export default choosingTeamState;
