import React, { Component } from 'react';
import './PlayerOwn.css';

class PlayerOwn extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      settimeout: 0,
    };
    console.log( 'PlayerOwn' );
  }
  componentWillMount() {
  }
  render_game_record() {
    const r = [];
    for ( let i = 0; i < this.props.games_record.length; ++i ) {
      if ( this.props.games_record[ i ] )
        r.push( <div style={{ color: 'blue', float: 'left' }} key={i}>O</div> );
      else
        r.push( <div style={{ color: 'red', float: 'left' }} key={i}>O</div> );
    }
    for ( let i = 0; i < ( 5 - this.props.games_record.length ); ++i )
      r.push( <div key={this.props.games_record.length + i} style={{ float: 'left' }} >O</div> );
    return r;
  }
  render() {
    const img_src = `${this.props.character}.png`;

    return <div className={'own'}>
      <li>I am:{this.props.ID}</li>
      <li>my character:{this.props.character}</li>
      <li>game{this.render_game_record.bind( this )()}</li>
      <li>stage:{this.props.stage}</li>
      <li><img
        src={img_src} height="140" width="100" alt=""
        className={`${this.props.className} photo` }
        onClick={() => {
          if ( this.props.is_leader )
            this.props.onclick();
        }}
        onMouseOver={() => {
          console.log( 'onMouseOver' );
          this.setState( {
            settimeout: setTimeout( () => this.props.change_show_explaination(), 1000 ),
          } );
        }}
        onMouseOut={() => {
          console.log( 'onMouseOut' );
          clearTimeout( this.state.settimeout );
        }}
      /></li>
      <img src="http://www.risk.net/IMG/853/112853/crown-iw.png"
      height="100" width="140" className={this.props.is_leader ? '' : 'hide'}
      />
    </div>;
  }
}

export default PlayerOwn;
