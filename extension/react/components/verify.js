
import React from 'react';
import {connect} from 'react-redux';

class Verify extends React.Component {

  constructor(props) {
    super(props);
  }

  submit = () => {
    console.log('You clicked submit');
    //If code is a match redirect to signup component (for signup) or to signin component (for signin). If not, stay on this page and throw error.

}

  resendCode = () => {
    console.log('You clicked resendCode');
    //Send
}

  render() {
    return (
      <div>
        <h2 align="center">Verify Activity</h2>;
        <br />
        <input type='text' name='verification-code' placeholder='Paste code from email here'>
        <button onClick={this.submit}>Submit</button>
        <br />
        <button onClick={this.resendCode}>Resend Code</button>
        <h6>Do you need help? Click <a href="">here.</a></h6>
      </div>
    )
  }
}

export default Verify;
