import React, { Component } from 'react';
import './Player.css';
class Player extends Component {
  constructor( props ) {
    super( props );
    console.log( 'Player' );
  }
  componentWillMount() {
  }
  render() {
    let outer_name = `${this.props.players_state} Player`;
    if ( this.props.is_leader )
      outer_name += ' leader';
    let inner_name = '';
    if ( this.props.is_Merlin )
      inner_name = 'Merlin';
    else if ( this.props.is_bad_men )
      inner_name = 'bad_man';
    return <div className={outer_name} >
      <div className={inner_name}>
        <img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12742136_736274853140630_5037882521848371900_n.jpg?oh=5753439b51912ba5823f002ec5909984&oe=58C1FA98"
           height="150" width="120" className={'portrait'}/><br/>
        <li>name:{this.props.name}</li>
        <li>id:{this.props.id}</li>
        <img src="http://www.risk.net/IMG/853/112853/crown-iw.png"
        height="100" width="140" className={this.props.is_leader ? '' : 'hide'}
        />
      </div>
    </div>;
  }
}

export default Player;
