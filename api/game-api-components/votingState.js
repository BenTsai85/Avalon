import State from './State';

class votingState extends State {
  constructor( gameapp ) {
    super();
    this.votes = 0; // success => 1, fail => -1
    this.voteCounter = 0; // how many people have voted?
    this.gameapp = gameapp;
    this.decideWhoWillGoToMission = this.decideWhoWillGoToMission.bind( this );
  }

  decideWhoWillGoToMission( memberUsernames ) {
    console.log('decideWhoWillGoToMission', memberUsernames );
  }

  vote( vote ) {
    if ( vote )
      this.votes += 1;
    else
      this.votes -= 1;
    this.voteCounter += 1;
    if ( this.voteCounter === this.gameapp.playerNumber ) {
      const outcome = this.voteCounter >= 0;
      console.log( 'informVotingOutcome', outcome );
    }
    this.setState( new this.gameapp.missionState() );
  }
}

export default votingState;
