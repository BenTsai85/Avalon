import React, { Component } from 'react';
import './Chatroom.css';
import 'babel-polyfill';
const gameroom_chat = io( 'http://localhost:3000/gameroom' );
class Chatroom extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      typing: '',
      sentences: [ 'default0', 'default0', 'default0' ],
    };
  }
  componentDidMount() {
    gameroom_chat.on( 'talk', async ( msg ) => {
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
    gameroom_chat.emit( 'talk', this.state.typing );
    await this.setState( { typing: '', sentences: this.state.sentences } );
    const chatting = document.getElementById( 'chatting' );
    chatting.scrollTop = chatting.scrollHeight;
  }
  render() {
    return <div className="gameroom">
        <div className="row">
            <div className="panel panel-default">
              <div className="panel-heading">Panel heading without title</div>
              <div className="panel-body">
                <div className="chatting" id="chatting">
                  {
                      this.state.sentences.map( ( v, i ) => <div className="row message-bubble" key={i}>
                          <div className="text-muted ">UserName waiting to set!:</div>
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
