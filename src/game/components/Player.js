import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor( props ) {
    super( props );
  }

  componentWillMount() {
  }

  render() {
    return <div className = {`Player ${this.props.playerState}`} onClick = { () => this.props.playerOnClick() } >
          img:{ this.props.img }                                <br/>
          username:{ this.props.username } <br/>
          isLeader:{ this.props.isLeader ? 1 : 0 } <br/>
          isVillain:{ this.props.isVillain ? 1 : 0 } <br/>
          playerState:{ this.props.playerState } <br/>
          isMerlin:{ this.props.isMerlin ? 1 : 0 } <br/>
    </div>;
  }

}

export default Player;
