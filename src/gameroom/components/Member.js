import React, { Component } from 'react';
import './Member.css';
class Member extends Component {
  constructor( props ) {
    super( props );
  }
  render() {
    return <div className={''} >
      <div className={`Member ${this.props.classname_prop}`}>
        <img src={this.props.img}
           height="150" width="120" className={'portrait'}/><br/>
        <li>name:{this.props.name}</li>
      </div>
    </div>;
  }
}

export default Member;
