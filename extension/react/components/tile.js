
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
        <h2 className="heading">Main Menu</h2>
        <div>
          <button className="btnTile" onClick={this.setComponent} id="login">Login</button>
          <button className="btnTile" onClick={this.setComponent} id="gen">Password</button> <br />
        </div>
        <div>
          <button className="btnTile" onClick={this.setComponent} id="profile">Profile</button>
          <button className="btnTile" onClick={this.setComponent} id="about">About</button>
        </div>

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
