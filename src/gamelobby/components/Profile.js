import React, { Component } from 'react';

class Profile extends Component {
  constructor() {
    super();
    state = {
      username: "",
      email: "",
      surplus: "",
    };
  }

  componentWillMount() {
    fetch( 'http://13.82.96.33:3000/auth/profile' )
      .then( res => res.json() )
      .then( res => {
        const { username, email, surplus } = res;
        this.setState( { username, email, surplus } );
      } );
  }

  render() {
    return (
      <section className="profile">
        <div className="jumbotron">
          <h1>???</h1>
        </div>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
              <p class="form-control-static">{ this.state.username }</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <p class="form-control-static">{ this.state.email }</p>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Account Balance</label>
            <div class="col-sm-10">
              <p class="form-control-static">{ this.state.surplus }</p>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default Profile;
