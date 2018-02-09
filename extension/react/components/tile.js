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
        <h2 className="heading">Main Menu</h2>
        <div>
          <button className="btnTile" onClick={this.setComponent} id="cred">Login</button>
          <button className="btnTile" onClick={this.setComponent} id="generator">Password</button> <br />
        </div>
        <div>
          <button className="btnTile" onClick={this.setComponent} id="profile">Profile</button>
          <button className="btnTile" onClick={this.setComponent} id="about">About</button>
        </div>
      </div>
    )
  }
}

export default Tile;
