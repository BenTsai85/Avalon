import State from './State';

class missionState extends State {
  constructor( gameapp ) {
    super();
    this.gameapp = gameapp;
    this.vetoVotes = 0;
    this.voteCounter = 0;
    this.vetoVotesThreshold = 0;
    if ( gameapp.length === 3 ) {
      if ( this.gameapp.gameRecord.length === 4 )
        this.vetoVotesThreshold = 2;
      this.vetoVotesThreshold = 1;
    }
  }

  missionVote( missionVote ) {
    if ( !missionVote )
      this.vetoVotes += 1;
    this.voteCounter += 1;
    if ( this.voteCounter === this.gameapp.allUsername.length ) {
      if ( this.vetoVotes >= this.vetoVotesThreshold )
        console.log( 'missionFail' );
      else
        console.log( 'missionSuccess' );
      this.gameapp.gameRecord.push( this.vetoVotes >= this.vetoVotesThreshold );

      
    }
  }

  changeState() {
    let success = 0;
    let fail = 0;
    this.gameapp.gameRecord.map( ( record ) => {
      if( record )
        success += 1;
      else
        fail += 1;
    } )
    if( success === 3 )
      console.log( 'good win' );
    else if( fail === 3 ) {
      this.gameapp.state = new this.gameapp.accassinState();
    } else {
      this.gameapp.state = new this.gameapp.choosingTeamState();
    }

  }
}

export default missionState;
