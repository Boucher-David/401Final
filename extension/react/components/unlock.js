
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
      console.log('Encrypt Data or Local Storage');
    } else {
      alert('Please enter data');
    }
    
    //When Master Key is given, encrypt and save it in Local Storage. This will not be kept after browser closes.

}

  gotoProfile = () => {
    console.log('You clicked gotoProfile');
    //Onclick return to profile page.
}

  render() {
    return (
      <div>
        <form>
          <h3>Unlock Account</h3>
          <input id='user-code' type="text" placeholder="Input Master Key here." />
          <br />
          <br />
          <button onClick={this.submitForm}>Submit</button>
          <hr />
          <h4>Return to Profile</h4>
          <button onClick={this.gotoProfile}>Profile</button>
          <h6>Click <a href=''>here</a> for help.</h6>
        </form>
      </div>
    )
    console.log('ID', id);
  }
}

export default Unlock;
