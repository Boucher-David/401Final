import React from 'react';
import {connect} from 'react-redux';
import { log } from 'util';

class Unlock extends React.Component {

  constructor(props) {
    super(props);
  }

  submitForm = (e) => {
    e.preventDefault();
    let userCode = document.getElementById('user-code');
    if (userCode.value !== '') {
      chrome.runtime.sendMessage({'setMK': userCode.value});
      this.props.toggle('tile');
      chrome.runtime.sendMessage({'changeLogo': 'VaultLogoLogin.png'});
    }

}

  gotoProfile = (e) => {
    e.preventDefault();
    this.props.toggle('profile');
}

  render() {
    return (
      <div className="unlock">
        <form>
          <h2 className="heading">Unlock Account</h2>
          <input id='user-code' type="text" placeholder="Input Master Key here." />
          <br />
          <br />
          <button onClick={this.submitForm}>Submit</button>
          <button onClick={this.gotoProfile}>Profile</button>
        </form>
      </div>
    )
  }
}

export default Unlock;
