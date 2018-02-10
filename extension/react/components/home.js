
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
      <div className="home">
        <img src="VaultLogo.png" className="header" /><h2 className="title">VAULT</h2><br />
        <p onClick={() => this.props.toggle('verify')}>Need to verify? Click here.</p>
        <button onClick={this.signup}>Signup</button>
        <button onClick={this.signin}>Signin</button>
      </div>
    )
  }
}

export default Home;
