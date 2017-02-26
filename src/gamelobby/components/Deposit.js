import React, { Component } from 'react';
import './Deposit.css';
var LineChart = require("react-chartjs").Line;

const socket = io.connect();
class Deposit extends Component {
  constructor( props ) {
    super( props );
    this.state = {
        surplus: 'none',
        depositValue: 0,
    };

    socket.on( 'Number', Number => {
        console.log('Number:', Number);
        if ( Number === '#' ) {
            this.setState( { depositValue: 0 } );
            return;
        } else if ( Number === '*' )
          this.deposit();
        const depositValue = String(this.state.depositValue) + String( Number );
        this.setState( { depositValue } );
        this.props.back();
    } );

    fetch( '/surplus' ).then( res => res.json() )
    .then( res => this.setState( { surplus: res.surplus } ) );
  }

  deposit = () => {
    console.log( 'deposit' );
    fetch( '/deposit', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify( { deposit: this.state.depositValue } ),
      credentials: 'same-origin',
    } );
  };

  render() {
    return (
      <div>
        <form>
              <div className="form-group">
                <div className = { 'depositLabel' } > Your Surplus: { this.state.surplus } </div>
                <span className = { 'depositLabel' } > How much do you want to deposit? ( '#' to zero ) </span>
                <input className="form-control" style = {{ margin: '1em' }} placeholder="Enter email" value = { this.state.depositValue }/>
                <button className = 'btn btn-primary' style = {{ margin: '1em' }} onClick = { () => this.deposit() }>Submit</button>
                <button className = 'btn btn-secondary' style = {{ margin: '1em' }} onClick = { () => this.props.back() }>Back</button>
              </div>
        </form>
      </div>
    );
  };
};


export default Deposit;
