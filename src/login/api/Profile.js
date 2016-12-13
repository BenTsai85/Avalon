import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.renderList = this.renderList.bind( this );
  }

  renderList() {
    return (
      <div>
        { this.props.friendlist.map( ( item, index ) =>
          <a href={ `#/users/${item.id}` } key={ index }>{ item.username }</a>
        ) }
      </div>
    );
  }

  render() {
    return (
      <section className="profile">
        <div className="jumbotron">
          <h1>Foodzone</h1>
        </div>
        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#/users">Profile</a></li>
          <li role="presentation"><a href="#/users">Friends</a></li>
          <li role="presentation"><a href="#/users">Chat Rooms</a></li>
          <li role="presentation"><a href="/">Logout</a></li>
        </ul>
        <h2>{ this.props.username }</h2>
        { this.renderList() }
      </section>
    );
  }
}

export default Profile;
