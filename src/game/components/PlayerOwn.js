import React, { Component } from 'react';
import './PlayerOwn.css';

class PlayerOwn extends Component {
  constructor( props ) {
    super( props );
    console.log( 'PlayerOwn' );
              // ID={this.props.ID}
              // character={this.props.character}
              // games_record={this.props.games_record}
              // stage={this.props.stage}
  }
  componentWillMount() {
  }
  render_game_record() {
    const r = [];
    for ( let i = 0; i < this.props.games_record.length; ++i ) {
      if ( this.props.games_record[ i ] )
        r.push( <div style={{ blackground: 'blue' ,float:'left'}} key={i}>O</div> );
      else
        r.push( <div style={{ blackground: 'red' ,float:'left'}} key={i}>O</div> );
    }
    for ( let i = 0; i < ( 5 - this.props.games_record.length ); ++i )
      r.push( <div key={this.props.games_record.length + i} style={{float:'left'}} >O</div> );
    return r;
  }
  render() {
    return <div>
      <li>I am:{this.props.ID}</li>
      <li>my character:{this.props.character}</li>
      <li>game{this.render_game_record.bind( this )()}</li>
      <li>stage:{this.props.stage}</li>
      <li><img
        src={this.props.img_limk} height="140" width="100" alt=""
        className={`${this.props.className} photo` }
        onClick={()=>{
          if(this.props.is_leader)
            this.props.onclick();
        }}
      /></li>
      <img src="http://www.risk.net/IMG/853/112853/crown-iw.png"
      height="100" width="140" className={this.props.is_leader ? '' : 'hide'}
      />
    </div>;
  }
}

export default PlayerOwn;
