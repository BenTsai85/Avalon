import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      checkName: false,
      passwordAgain: '',
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

  clear() {
    this.setState( {
      username: '',
      password: '',
      checkName: false,
      passwordAgain: '',
    } );
  }

  usernameChange( e ) {
    this.setState( { username: e.target.value } );
    this.props.checkName( e.target.value );
  }

  componentDidUpdate() {
    if ( !this.props.error && this.state.username !== '' )
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
    if ( !this.props.error && this.state.username !== '' && this.state.password.length >= 6 && this.state.password === this.state.passwordAgain )
      this.props.signup( this.state.username, this.state.password );
  }

  render() {
    return (
      <div className="signup">
        <div className="jumbotron">
          <h1>Foodzone <small>Sign Up</small></h1>
        </div>
        <form onSubmit={ this.submit }>
          <div className="col-xs-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="username">User Name*</label>
              <input type="text" id="username" className="form-control" placeholder="User Name"
                value={ this.state.username }
                onChange={ this.usernameChange }/>
              <img id='checkName' width="25px" height="25px"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password* ( longer than 5 )</label>
              <input type="password" id="password" className="form-control" placeholder="Password"
                value={ this.state.password }
                onChange={ e => { this.setState( { password: e.target.value } ); } }/>
              <img id='checkPassword' width="25px" height="25px"/>
            </div>
            <div className="form-group">
              <input type="password" id="passwordAgain" className="form-control" placeholder="Please enter Password again"
                value={ this.state.passwordAgain }
                onChange={ e => { this.setState( { passwordAgain: e.target.value } ); } }/>
              <img id='checkPasswordAgain' width="25px" height="25px"/>
            </div>
            <div className="col-xs-12">
              <div className="col-xs-6">
                <input id="submit" className="btn btn-default" type="submit" value="submit" />
              </div>
              <div className="col-xs-6">
                <button id="clear" className="btn btn-default" onClick={ this.clear }>clear</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
