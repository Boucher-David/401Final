import React from 'react';
import {renderIf} from '../lib/__';

import superagent from 'superagent';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'username',
      email1: 'david_boucher@outlook.com',
      email2: 'david_boucher@outlook.com',
      password1: 'password',
      password2: 'password',
      error: null
    };
  }

  handleChange = (e) => {
    let {name, value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if ((this.state.password1 === this.state.password2) && (this.state.email1 === this.state.email2)) {
      let credentials = {};
      credentials['email'] = this.state.email1;
      credentials['password'] = this.state.password1;
      credentials['username'] = this.state.username;
      let _string = JSON.stringify(credentials);


      superagent.post('http://localhost:3000/profile/signup').set('Authorization', `Basic ${btoa(_string)}`).then(response => {
        console.log(response.body.vault);
      if (response.body.vault.signup) return this.props.toggle('verify');

      });
    }

  }
  render() {

    let email1 =
                <label htmlFor='email1'>
                  <span>Email1</span>
                  <input
                    type='text'
                    name='email1'
                    placeholder='email1'
                    value={this.state.email1}
                    required='true'
                    onChange={this.handleChange}
                   />
                </label>

    let email2 =
                <label htmlFor='email2'>
                <span>Email2</span>
                <input
                  // id="email"
                  type="text"
                  name="email2"
                  placeholder="email2"
                  value={this.state.email2}
                  required="true"
                  onChange={this.handleChange}
                  />
                </label>



    let password1 =
                <label htmlFor='password1'>
                  <span>Password1</span>
                  <input
                    type="password"
                    name="password1"
                    placeholder="password"
                    value={this.state.password1}
                    required="true"
                    onChange={this.handleChange}
                    />
                </label>

  let password2 =
                <label htmlFor='password2'>
                <span>Password2</span>
                <input
                  type="password"
                  name="password2"
                  placeholder="password"
                  value={this.state.password2}
                  required="true"
                  onChange={this.handleChange}
                  />
                </label>



    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <h2 className="heading">SIGN UP NOW!</h2>
          <label htmlFor='username'>
            <span>Username</span>
            <input
              // id="email"
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              required="true"
              onChange={this.handleChange}
            />
          </label>

          {email1}
          {email2}
          {password1}
          {password2}<br />


          <br />

          <button className="btnVault" type="submit">Create Account</button>
          <button className="btnVault" onClick={this.goBack}>Back</button>

        </form>
      </div>
    )

  }
}

export default Signup;
