
import React from 'react';
import {connect} from 'react-redux';
import PWGenerator from './pwGenerator';
import About from './about';
import Profile from './profile/_profile';
import Logins from './logins/_logins';

class Tile extends React.Component {

  constructor(props) {
    super(props);

    let start = {
      logins: false,
      pwGenerator: false,
      profile: false,
      about: false
    };
    this.state = {
      ...start
    };
  }

  componentWillUpdate() {
    console.log(this.state);
  }

  setComponent = (e) => {
    e.preventDefault();
    Object.keys(this.state).forEach(component => {
      this.setState({[component]: false});
    });

    this.setState({[e.target.id]: true});
    
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
            <button onClick={this.setComponent} id="logins">Logins</button>
            <button onClick={this.setComponent} id="pwGenerator">PW Generator</button>
            <button onClick={this.setComponent} id="profile">Profile</button>
            <button onClick={this.setComponent} id="about">About</button>
        </div>
          <div>
          {(this.state.logins) ? <Logins /> : null}
          {(this.state.pwGenerator) ? <PWGenerator /> : null}
          {(this.state.profile) ? <Profile /> : null}
          {(this.state.about) ? <About /> : null}
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
