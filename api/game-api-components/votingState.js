import State from './State';

class votingState extends State {
  constructor( gameapp ) {
    super();
    this.statename = 'votingState';
    this.gameapp = gameapp;
    this.gameapp.io.on( 'connection', socket => {
        socket.on( 'vote' ,v => {
          console.log( 'vote', v );
          console.log( 'this.votes', this.votes);
          console.log( 'this.voteCounter ', this.voteCounter );
          const idx = this.gameapp.allUserSocketId.indexOf( socket.id );
          this.voteRecord[ idx ] = v;
          if ( v )
            this.votes += 1;
          this.voteCounter += 1;
          if ( this.voteCounter === this.gameapp.playerNumber ) {
            if ( this.votes >= 0 ) {
              const state = 'missionState';
              const voted = false;
              this.gameapp.io.emit( 'setState', { state, voted } );
              this.gameapp.setState( this.gameapp.missionState );
            }
            else
              this.gameapp.setState( this.gameapp.choosingTeamState );
            this.gameapp.voteRecordList.push( this.voteRecord );
          }
        } );
      } );
  }

  initTheState = () => {
    this.votes = 0; // success => >=0, or fail
    this.voteRecord = Array( this.gameapp.playerNumber );
    this.voteCounter = 0; // how many people have voted?
  };

  vote = vote => {
    if ( vote )
      this.votes += 1;
    else
      this.votes -= 1;
    this.voteCounter += 1;
    if ( this.voteCounter === this.gameapp.playerNumber ) {
      const outcome = this.voteCounter >= 0;
      if ( outcome ) {
        this.gameapp.io.emit( 'setState', { state: 'missionState' } );
        this.setState( this.gameapp.missionState );
      } else {
        const state = 'choosingTeamState';
        const playerState = this.gameapp.missionMemberArray.map( bool => bool ? 'teamMember' : 'none' );
        this.gameapp.io.emit( 'setState', { state, playerState } );
        this.setState( this.gameapp.choosingTeamState );
      }
    }
  };
}

export default votingState;
