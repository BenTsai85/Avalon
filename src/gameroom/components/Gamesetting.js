import React, { Component } from 'react';
import './Gamesetting.css';

const gameroom_chat = io( 'http://localhost:3000/gameroom' );
class Gamesetting extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      is_ready: false,
    };
  }
  componentWillMount() {

  }

  text = () => {
    if ( this.props.is_chief )
      return 'Start';
    return this.state.is_ready ? 'Cancel' : 'Ready';
  }

  render() {
    return <div style={{ margin: '1em' }}>
    <div className="row">
      <div className="col-xs-6">
        <div className="checkbox">
          <label><input type="checkbox" value=""/>Percival</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" value=""/>Mordred</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" value="" disabled/>Merlin</label>
        </div>
      </div>
      <div className="col-xs-6">
        <div className="checkbox">
          <label><input type="checkbox" value=""/>Oberon</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" value=""/>Morgana</label>
        </div>
      </div>
    </div>
  	<div className="row">
    	<button type="button" className={`${this.state.is_ready ? 'btn btn-primary' : 'btn btn-primary btn-outline'} btn-lg`}
    	onClick={ () => {
      if ( !this.props.is_chief ) {
        const a = async () => {
          await this.setState( { is_ready: !this.state.is_ready } );
          gameroom_chat.emit( 'set_is_ready', this.state.is_ready );
        };
        a();
      }
      else
          gameroom_chat.emit( 'game_start', '' );
    } } >
    	{ this.text() }
      </button>
  	</div>
    </div>;
  }
}

export default Gamesetting;
