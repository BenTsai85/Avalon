import React, { Component } from 'react';
import './PlayerOwn.css';

class PlayerOwn extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      settimeout: 0,
    };

    //     username = { v }
    // isLeader = { this.state.state === 'choosingTeam' && this.state.leader === v }
    // isVillain = { this.state.isVillain[ i ] }
    // playerState = { this.state.playerState[ i ] }
    // isMerlin = { this.state.isMerlin[ i ] }
    // >
  }
  render() {
    return <div className = { 'own' }>

      <li>username:{this.props.username}</li>
      <li>isLeader:{this.props.isLeader ? 1 : 0}</li>
      <li>isVillain:{this.props.isVillain.map( v => ( v ? 1 : 0 ) )}</li>
      <li>playerState:{this.props.playerState}</li>
      <li>isMerlin:{this.props.isMerlin.map( v => ( v ? 1 : 0 ) )}</li>
      <li><img
        src={ `${this.props.character}.png` } height="140" width="100" alt=""
        className={`${this.props.className} photo` }
        onClick={() => {
          if ( this.props.isLeader ||
              ( this.props.State === 'accassinState' && this.props.character === 'accassin' ) )
            this.props.onclick();
        }}
        onMouseOver={() => {
          this.setState( {
            settimeout: setTimeout( () => this.props.showExplaination(), 1000 ),
          } );
        }}
        onMouseOut={() => {
          clearTimeout( this.state.settimeout );
        }}
      /></li>
    </div>;
  }
}

export default PlayerOwn;
