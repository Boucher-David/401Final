
import React from 'react';
import {connect} from 'react-redux';

class Tile extends React.Component {

  constructor(props) {
    super(props);

  }

  setComponent = (e) => {
    this.props.toggle(e.target.id);
  }

  render() {
    return (
      <div>
        <div>
          <h3>Main Menu</h3>
            <button onClick={this.setComponent} id="cred">Credentials</button>
            <button onClick={this.setComponent} id="pw">PW Generator</button>
            <button onClick={this.setComponent} id="profile">Profile</button>
            <button onClick={this.setComponent} id="about">About</button>
        </div>
      </div>
    )
  }
}

export default Tile;