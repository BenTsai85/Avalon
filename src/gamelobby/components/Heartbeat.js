import React, { Component } from 'react';

class Whether extends Component {
  constructor( props ) {
    super( props );
    this.state = {
    };
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        <div>
          <button type="button" className="btn btn-default"
            onClick = { () => this.props.back( ) } > Back
          </button>
        </div>
      </div>
    );
  }
}

export default Whether;
