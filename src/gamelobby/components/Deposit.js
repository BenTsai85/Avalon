import React, { Component } from 'react';
import './Deposit.css';
var LineChart = require("react-chartjs").Line;

const socket = io.connect( 'http://localhost' );
class Deposit extends Component {
  constructor( props ) {
    super( props );
    this.state = {
        surplus: 'none',
        depositValue: 0,
    };

    socket.on( 'Number', Number => {
        const depositValue = this.state.depositValue + String( Number );
        this.setState( { depositValue } );
    } );

    fetch( '/surplus' ).then( res => res.json() )
    .then( res => console.log( res ) );
    // .then( res => this.setState( { surplus: res } ) );
  }

  deposit = deposit => {
    fetch( '/deposit', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( { deposit } ),
      credentials: 'same-origin',
    } );
  };

  render() {
    this.deposit( 9876 );
    return (
      <div>
        <form>
              <div className="form-group">
                <div className = { 'depositLabel' } > Your Surplus: { this.state.surplus } </div>
                <span className = { 'depositLabel' } > How much do you want to deposit? </span>
                <input className="form-control"  placeholder="Enter email" value = { this.state.depositValue }/>
              </div>
        </form>
      </div>
    );
  };
};


export default Deposit;
