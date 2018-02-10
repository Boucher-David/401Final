
import React from 'react';

import superagent from 'superagent';

class Verify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      code: '',
      message: ''
    };
  }


  submitCode = (event) => {
    event.preventDefault();

   if (this.state.code === '') return this.setState({error: true, message: 'Please enter code.'});
    superagent.get(`http://vault-extension.herokuapp.com/verify/${this.state.code}`).then(response => {
      if (response.body.vault.verified) return this.props.toggle('signin');
      return this.setState({error: true, message: "Unable to verify. Try again."})
    });
  }

  captureCode = (event) => {
    event.preventDefault();
    this.setState({code: event.target.value});
  }

  back = (e) => {
    e.preventDefault();
    this.props.toggle("home");
  }
  render() {
    return (
      <div className="verify">
        <h2 className="heading">Verify Activity</h2>
        <p>We sent you a code to your email. Paste it below:</p>
        <input id='user-code' type="text" onChange={this.captureCode}/>
        <br />
        <br />
        <button onClick={this.submitCode}>Submit</button>
        <button onClick={this.back}>Back</button>
        {(this.state.error) ? <p>{this.state.message}</p> : null}

      </div>
    )
  }
}

export default Verify;
