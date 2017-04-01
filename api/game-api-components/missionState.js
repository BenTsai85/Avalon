import State from './State';

class missionState extends State {
  constructor( gameapp ) {
    super();
    this.statename = 'missionState';
    this.gameapp = gameapp;
    this.gameapp.io.on( 'connection', socket => {
      socket.on( 'mission', v => {
        const idx = this.gameapp.allUserSocketId.indexOf( socket.id );
        if ( !v )
          this.vetoVotes += 1;
        this.voteCounter += 1;
        if ( this.voteCounter === this.gameapp.playerNumber ) {
          this.gameapp.gameRecord.push( this.vetoVotes >= this.vetoVotesThreshold );
          this.gameapp.missionVetoNumberRecord.push( this.vetoVotes );
          this.gameapp.setState( this.gameapp.choosingTeamState );
          this.gameapp.io.emit( 'setState', { gamesRecord: this.gameapp.gamesRecord } );
          this.gameapp.io.emit( 'showTips', [ 'mission outcome' ] );
        }

      } );
    } );
  }

  initTheState = () => {
    if ( this.gameapp.playerNumber === 3 ) {
      if ( this.gameapp.gamesRecord.length === 4 )
        this.vetoVotesThreshold = 2;
      else
        this.vetoVotesThreshold = 1;
    }
    this.vetoVotes = 0;
    this.voteCounter = 0;
    this.vetoVotesThreshold = 0;
  };

  missionVote = missionVote => {
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
  };

  changeState = () => {
    let success = 0;
    let fail = 0;

    for ( const record of this.gameapp.gameRecord )
      if ( record )
        success += 1;
      else
        fail += 1;
    if ( success === 3 )
      console.log( 'good win' );
    else if ( fail === 3 ) {
      this.gameapp.state = new this.gameapp.accassinState();
    }
    else {
      this.gameapp.state = new this.gameapp.choosingTeamState();
    }
  };
}

export default missionState;
