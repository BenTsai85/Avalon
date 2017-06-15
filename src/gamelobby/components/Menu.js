import React, { Component } from 'react';
import './Menu.css';

const socket = io.connect();
class Menu extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      list: [ 'Sales', 'History', 'Deposit' ],
    };
    // socket.on( 'Number', Number => this.props.setLoc( this.state.list[ Number - 1 ] ) );
  }

  render() {
    return (
      <div>
        { this.state.list.map( ( content, idx ) =>
            <button type="button" className="btn btn-primary menuOption" key = { idx } onClick = { () => this.props.setLoc( content ) } >
            { content } </button>
        ) }
      </div>
    );
  }
}

export default Menu;
