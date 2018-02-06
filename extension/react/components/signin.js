import React from 'react';
import {renderIf} from '../lib/__';
import { log } from 'util';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      email: '',
      password1: '',
      error: null
    };
  }

  handleChange = (e) => {
    // console.log(e.target.value, 'target')

    let {name, value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('__SIGNIN__');
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
                <label htmlFor='password1'>
                  <span>Password</span>
                  <input 
                    type="password"
                    name="password1"
                    placeholder="password"
                    value={this.state.password}
                    required="true"
                    onChange={this.handleChange}
                    />
                </label>

    

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Existing Users Login</h3>

          {username}
          {password1}

          <button type='submit'>Login</button>
        </form>

        
      </div>
    )

  }
}

export default Signin;