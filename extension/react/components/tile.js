
import React from 'react';
import {connect} from 'react-redux';

class Tile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      gen: false,
      profile: false,
      about: false
    }
  }

  setComponent = (e) => {
    e.preventDefault();
    Object.keys(this.state).forEach(component => {
      this.setState({[component]: false});
    });

    this.setState({[e.target.id]: true});
    console.log(this.state);
  }


  render() {
    return (
      <div>
        <h3>Main Menu</h3>
          <button onClick={this.setComponent} id="login">Go To Login</button>
          <button onClick={this.setComponent} id="gen">Gen Password</button> <br />
          <button onClick={this.setComponent} id="profile">Got To Profile</button>
          <button onClick={this.setComponent} id="about">About App Team</button>


          <div>
            {(this.state.login) ? <Logins /> : null}
            {(this.state.gen) ? <Gen /> : null}
            {(this.state.profile) ? <Profile toggle={this.props.toggle}/> : null}
            {(this.state.about) ? <About toggle={this.props.toggle}/> : null}
        </div>

      </div>
    )
  }
}

export default Tile;
