import React, { Component } from 'react';
import './Chatroom.css';
import 'babel-polyfill';

const gamelobby_chat = io( 'http://localhost:3000/gamelobby' );
class Chatroom extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      typing: '',
      sentences: [ this.props.user.name + ' logged in.' ],
    };
  }
  componentDidMount() {
    gamelobby_chat.on( 'talk', async ( msg ) => {
      await this.state.sentences.push( msg );
      await this.setState( { sentences: this.state.sentences } );
      const chatting = document.getElementById( 'chatting' );
      chatting.scrollTop = chatting.scrollHeight;
    } );
  }
  sent = async ( e ) => {
    if ( !this.state.typing )
      return;
    await this.state.sentences.push( this.state.typing );
    gamelobby_chat.emit( 'talk', this.state.typing );
    await this.setState( { typing: '', sentences: this.state.sentences } );
    const chatting = document.getElementById( 'chatting' );
    chatting.scrollTop = chatting.scrollHeight;
  }
  render() {
    return <div className="gamelobby">
        <div className="row">
            <div className="panel panel-default">
              <div className="panel-heading">Chatroom</div>
              <div className="panel-body">
                <div className="chatting" id="chatting">
                  {
                      this.state.sentences.map( ( v, i ) => <div className="row message-bubble" key={i}>
                          <div className="text-muted ">{ this.props.user.name }:</div>
                          <div className="float-left">{v}</div>
                        </div> )
                  }
                </div>
                <div className="panel-footer">
                     <div className="input-group">
                      <input type="text" className="form-control" value={this.state.typing}
                      onChange={e => this.setState( { typing: e.target.value } )}
                      onKeyPress={( e ) => {
                        if ( e.key == 'Enter' )
                          this.sent( e );
                      }}/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" onClick={this.sent} type="button">Send</button>
                        }
                      </span>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>;
  }
}

export default Chatroom;
