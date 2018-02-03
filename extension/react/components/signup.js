import React from 'react';
import {renderIf} from '../lib/__';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      error: null
    };
  }

  handleChange(e) {
    let {name, value} = e.target;
    this.getState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let handler = e.target.dataset.handler ==='signup' ? this.props.handleCreate : this.props.handleLogin;
    handler(this.state)
    .then()
    .catch(console.error);
  }

  render() {

    let username = 
                <label htmlFor='username'>
                  <span>Username</span>
                  <input
                    type='text'
                    name='username'
                    placeholder='username'
                    value={this.state.username}
                    required='true'
                    onChange={this.handleChange}
                   />
                </label>

    let password1 = 
                <label htmlFor='password'>
                  <span>Password</span>
                  <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    required="true"
                    onChange={this.handleChange}
                    />
                </label>

    return (
      <div>
        <form>
          <h3>Existing Users Login</h3>

          {username}
          {password1}

          <button type='submit'>Login</button>
        </form>

        <form>
          <h3>New User, Create Account</h3>
          <label htmlFor='email'>
            <span>Email Address</span>
            <input 
              id="email"
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              required="true"
              onChange={this.handleChange}
            />
          </label>

          {username}
          {password1}

          <button type="submit">Create Account</button>

        </form>
      </div>
    )

  }
}

export default Signup;