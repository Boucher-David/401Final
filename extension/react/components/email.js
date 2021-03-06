import React from 'react';

import superagent from 'superagent';

class Email extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldEmail: '',
      newEmail: '',
      message: null
    };

  }

  handleChange = (e) => {

    let {name, value} = e.target;
    this.setState({[name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.sync.get('vault', response => {
      this.setState({'user_id': response.vault.user_id});

      let _string = JSON.stringify(this.state);

      superagent.post('http://vault-extension.herokuapp.com/profile/update/email').set('Authorization', `Basic ${btoa(_string)}`).then(res => {
        if (!res.body.update) return this.setState({'message': 'Failed to update. Check your old email.'})
        return this.setState({'message': `Success. Your new email is ${this.state.newEmail}`});
      });

    });
  }

  back = (e) => {
    this.props.toggle('profile');
  }



  render() {
    return (
      <div className="signup">

        <form onSubmit={this.handleSubmit}>
          <label>
            <h2 className="heading">Update Email</h2>
            < br/>
            <input
              type='text'
              name='oldEmail'
              required='true'
              placeholder='Old Email'
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              type='text'
              name='newEmail'
              required='true'
              placeholder='New Email'
              value={this.state.email2}
              onChange={this.handleChange}
            />

          </label>
          <button type="submit">Save</button>
          <button onClick={this.back}>Back</button>
          <p>{this.state.message}</p>
        </form>




      </div>

    )
  }
}


export default Email;
