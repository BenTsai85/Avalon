import React, { Component } from 'react';
import './SignUp.css';

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
  }

  componentDidMount() {
    document.getElementById( 'checkPassword' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';
    document.getElementById( 'checkPasswordAgain' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';
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
    if ( this.state.password.length >= 6 )
      document.getElementById( 'checkPassword' ).src = 'http://www.clipartkid.com/images/415/compete-the-self-check-below-eY7Akc-clipart.png';
    else
      document.getElementById( 'checkPassword' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';
    if ( this.state.password === this.state.passwordAgain )
      document.getElementById( 'checkPasswordAgain' ).src = 'http://www.clipartkid.com/images/415/compete-the-self-check-below-eY7Akc-clipart.png';
    else
      document.getElementById( 'checkPasswordAgain' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';
  }

  submit() {
    console.log( 'submit' );
    if ( this.state.username == '' )
      window.alert( 'Please enter your name!' );
    else if ( this.state.email == '' )
      window.alert( 'Please enter your email!' );
    else if ( this.state.password.length < 6 )
      window.alert( 'Password must be longer than 6!' );
    else if ( this.state.password !== this.state.passwordAgain )
      window.alert( 'The second password is different from the first one!' );
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
              <label htmlFor="password">Password* ( longer than 5 )</label>
              <input type="password" id="password" className="form-control" placeholder="Password"
                value={ this.state.password }
                onChange={ ( e ) => { this.setState( { password: e.target.value } ); } }/>
              <img id='checkPassword' width="25px" height="25px"/>
            </div>
            <div className="form-group">
              <input type="password" id="passwordAgain" className="form-control" placeholder="Please enter Password again"
                value={ this.state.passwordAgain }
                onChange={ ( e ) => { this.setState( { passwordAgain: e.target.value } ); } }/>
              <img id='checkPasswordAgain' width="25px" height="25px"/>
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
        <div className="col-xs-12 col-sm-6 IntegralPic">
          <label className="btn btn-default" id="upload" htmlFor="icon">Select Your Profile Picture</label>
          <input id="icon" type="file" accept="image/*" onChange={ this.loadImage }/>
          <img id="profileImg" className='thumbnail' src={ this.state.icon ? ( window.URL || window.webkitURL ).createObjectURL( this.state.icon ) : 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg' } width='400px' height='400px' />
        </div>
      </div>
    );
  }
}

export default SignUp;
