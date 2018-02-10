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
      <div className="profile">
        <h1 className="heading">Main Menu</h1>
        <div>
          <button onClick={this.setComponent} id="cred">Login</button>
          <button onClick={this.setComponent} id="pwGenerator">Password</button> <br />
          <button onClick={this.setComponent} id="profile">Profile</button>
          <button onClick={this.setComponent} id="about">About</button>
        </div>
      </div>
    )
  }
}

export default Tile;
