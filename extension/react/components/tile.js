
import React from 'react';
import {connect} from 'react-redux';

class Tile extends React.Component {

  constructor(props) {
    super(props);

  }


  setComponent = (e) => {
    this.props.toggle(e.target.id);
  }

// gotoLogin = () => {
//   console.log('You clicked gotoLogin');

// }

// gotoPWGenerator = () => {
//   console.log('You clicked gotoPWGenerator');

// }
// gotoProfile = () => {
//   console.log('You clicked gotoProfile');

// }
// gotoAbout = () => {
//   console.log('You clicked gotoAbout');

// }
  render() {
    return (
      <div>
        <div>
          <h3>Main Menu</h3>
            <button onClick={this.setComponent} id="cred">Logins</button>
            <button onClick={this.setComponent} id="pw">PW Generator</button>
            <button onClick={this.setComponent} id="profile">Profile</button>
            <button onClick={this.setComponent} id="about">About</button>
        </div>
      </div>
    )
  }
}

export default Tile;

{/* <button onClick={this.gotoLogin}>Go To Login</button>
          <button onClick={this.gotoPWGenerator}>Gen Password</button> <br />
          <button onClick={this.gotoProfile}>Got To Profile</button>
          <button onClick={this.gotoAbout}>About App Team</button> */}
