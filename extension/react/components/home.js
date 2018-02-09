
import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

 signup = () => {
  this.props.toggle('signup');
}

 signin = () => {
  this.props.toggle('signin');
}

  render() {
    return (
      <div>
        <img src="VaultLogo.png" class="header" /><h2 class="title">PROJECT VAULT</h2><br /><br />
        <button className="btnVault" onClick={this.signup}>Signup</button>
        <button className="btnVault" onClick={this.signin}>Signin</button>
      </div>
    )
  }
}

export default Home;
