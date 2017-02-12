import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: 'nickchen',
      password: '12345678',
      email: 'za8244@ntu.edu.tw',
      icon: null,
      checkName: true,
      passwordAgain: '12345678',
    };
    this.loadImage = this.loadImage.bind( this );
    this.clear = this.clear.bind( this );
    this.usernameChange = this.usernameChange.bind( this );
    this.submit = this.submit.bind( this );
  }

  componentDidMount() {
    document.getElementById( 'checkName' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';
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
      checkName: false,
      passwordAgain: '',
    } );
  }

  usernameChange( e ) {
    this.setState( { username: e.target.value } );
  }

  componentDidUpdate() {
    if ( this.state.username !== '' )
      document.getElementById( 'checkName' ).src = 'http://www.clipartkid.com/images/415/compete-the-self-check-below-eY7Akc-clipart.png';

    else
      document.getElementById( 'checkName' ).src = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR3gMHpsVgrgcch4c78ABRBzGjmf4NNztlo5ykhmg9hv0BHX3_U';

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
    if ( this.state.username !== '' && this.state.password.length >= 6 && this.state.password === this.state.passwordAgain ) {
      console.log( 'pass check' );
      const user = {
        name: this.state.username,
        password: this.state.password,
        email: this.state.email,
      };
      console.log( user );
      fetch( 'api/auth/signup', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( user ),
        credentials: 'same-origin',
      } ).then( res => res.json() )
            .then( ( res ) => {
              if ( res.status ) document.location.href = '/';
            } );
    }
  }

  render() {
    return (
      <div className="signup">
        <div className="jumbotron">
          <h1>Foodzone <small>Sign Up</small></h1>
        </div>
        <form>
          <div className="col-xs-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="username">User Name*</label>
              <input type="text" id="username" className="form-control" placeholder="User Name"
                value={ this.state.username }
                onChange={ this.usernameChange }/>
              <img id='checkName' width="25px" height="25px"/>
            </div>
            <div className="form-group">
              <label htmlFor="email" id="emailLabel">Email Address</label>
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
            <div className="col-xs-12">
              <div className="col-xs-6">
                <input id="submit" onClick={() => this.submit()} className="btn btn-default" type="submit" value="submit" />
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
        </form>
      </div>
    );
  }
}

export default SignUp;
