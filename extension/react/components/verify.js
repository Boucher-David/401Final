
import React from 'react';
import {connect} from 'react-redux';

class Verify extends React.Component {

  constructor(props) {
    super(props);
  }

  submitForm = () => {
    console.log('You clicked submit');
    //If code is a match redirect to signup component (for signup) or to signin component (for signin). If not, stay on this page and throw error.

}

  resendCode = () => {
    console.log('You clicked resendCode');
    //Send request to backend for new code to be sent to the users email address.
}

  render() {
    return (
      <div>
        <h2>Verify Activity</h2>
        <input id='user-code' type="text" />
        <br />
        <br />
        <button onClick={this.submitForm}>Submit</button>
        <button onClick={this.resendCode}>Resend Code</button>
        <h6>Click <a href=''>here</a> for help.</h6>
      </div>
    )
  }
}

export default Verify;
