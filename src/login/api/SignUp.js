import React, { Component } from 'react';
import './SignUp.css';

const socket = io.connect();
class SignUp extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: '',
      password: '',
      email: '',
      icon: null,
      passwordAgain: '',
    };
    this.loadImage = this.loadImage.bind( this );
    this.clear = this.clear.bind( this );
    this.usernameChange = this.usernameChange.bind( this );
    this.submit = this.submit.bind( this );
    socket.on( 'RFID', RFID => this.setState( { password: RFID } ) );

  }

  componentDidMount() {
  }

  loadImage( e ) {
    this.setState( { icon: new Blob( [ e.target.files[ 0 ] ], { type: 'image/*' } ) } );
  }

  clear() {
    this.setState( {
      username: '',
      password: '',
      email: '',
      icon: null,
      passwordAgain: '',
    } );
  }

  usernameChange( e ) {
    this.setState( { username: e.target.value } );
  }

  componentDidUpdate() {
  }

  submit() {
    console.log( 'submit' );
    if ( this.state.username == '' )
      window.alert( 'Please enter your name!' );
    else if ( this.state.email == '' )
      window.alert( 'Please enter your email!' );
    else {
      console.log( 'pass check' );
      const signUpForm = new FormData();
      signUpForm.append( 'name', this.state.username );
      signUpForm.append( 'password', this.state.password );
      signUpForm.append( 'email', this.state.email );
      signUpForm.append( 'icon', this.state.icon );
      console.log( signUpForm );
      fetch( '/auth/signup', {
        method: 'POST',
        body: signUpForm,
        credentials: 'same-origin',
      } )
        .then( res => res.json() )
        .then( ( res ) => {
          if ( res.status )
            this.props.changeLoc( 'login' );
        } );
    }
  }

  setRFID = ( e ) => this.setState( { password: e.target.value } );

  render() {
    return (
      <div className="signup">
        <div className="jumbotron">
          <h1>Avalon <small>Sign Up</small></h1>
        </div>
        <div className="col-xs-12 col-sm-6">
          <form>
            <div className="form-group">
              <label htmlFor="username">User Name*</label>
              <input type="text" id="username" className="form-control" placeholder="User Name"
                value={ this.state.username }
                onChange={ this.usernameChange }/>
            </div>
            <div className="form-group">
              <label htmlFor="email" id="emailLabel">Email Address*</label>
              <input type="email" id="email" className="form-control" placeholder="Email"
                value={ this.state.email }
                onChange={ ( e ) => { this.setState( { email: e.target.value } ); } }/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Use RFID</label>
              <input type="password" id="password" className="form-control" placeholder="Password"
                value={ this.state.password }
                onChange={ ( e ) => { this.setState( { password: e.target.value } ); } }/>
              <img id='checkPassword' width="25px" height="25px"/>
            </div>
          </form>
          <div className="col-xs-12">
            <div className="col-xs-6">
              <button id="submit" onClick={() => this.submit()} className="btn btn-default">submit</button>
            </div>
            <div className="col-xs-6">
              <button id="clear" className="btn btn-default" onClick={ this.clear }>clear</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
