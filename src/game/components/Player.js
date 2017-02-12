import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    let outerName = `${this.props.players_state} Player`;
    if ( this.props.is_leader ) outerName += ' leader';
    let innerName = '';
    if ( this.props.is_Merlin )
      innerName = 'Merlin';

    else if ( this.props.is_bad_men )
      innerName = 'bad_man';

    return <div className={outerName} >
      <div className={innerName}>
        <img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12742136_736274853140630_5037882521848371900_n.jpg?oh=5753439b51912ba5823f002ec5909984&oe=58C1FA98"
           height="150" width="120" className={'portrait'}/><br/>
        <img src="http://www.risk.net/IMG/853/112853/crown-iw.png"
        height="100" width="140" className={this.props.is_leader ? '' : 'hide'}
        />
          username = { this.props.username }
          isLeader = { this.props.isLeader }
          isVillain = { this.props.isVillain }
          playerState = { this.props.playerState }
          isMerlin = { this.props.isMerlin }
      </div>
    </div>;
  }
}

export default Player;
