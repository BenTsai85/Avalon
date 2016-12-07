import React, { Component } from 'react';

class Player extends Component {
  constructor( props ) {
  	super( props );
    // this.state = {
    // }
    console.log( 'Player' );
  }
  componentWillMount() {
  }
  render() {
    return <div>
      name:{this.props.name} <br/>
      id:{this.props.id} <br/>
      <button onClick={( e ) => { this.props.choose( e ); }}>choose as team member</button>
    </div>;
  }
}

export default Player;
