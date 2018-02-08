
import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  _find = () => {
    let _user_id = false;
    let _mk = false;

    chrome.storage.sync.get('vault', response => {
      if (!response.vault) return;
      if (response.vault.user_id) _user_id = true;
      chrome.runtime.sendMessage({'getMK': null}, (response) => {
        _mk = response;
        if (_mk && _user_id) this.props.toggle('tile');
        if (_user_id) this.props.toggle('unlock');
      })  
    });
  }

  componentDidMount() {
    this._find();
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
        <img src="VaultLogo.png" />
        <button onClick={this.signup}>Signup</button>
        <button onClick={this.signin}>Signin</button>
      </div>
    )
  }
}

export default Home;
