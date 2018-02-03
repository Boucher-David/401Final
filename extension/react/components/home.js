
import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }
 signup = () => {
  console.log('You clicked Signup');
}

 signin = () => {
  console.log('You clicked Signin');
}

  render() {
    return (
      <div>
        <img src="icon.png" />
        <button onClick={this.signup}>Signup</button>
        <button onClick={this.signin}>Signin</button>
      </div>
    )
  }
}

export default Home;
