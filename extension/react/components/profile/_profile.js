import React from 'react';
import {connect} from 'react-redux';
import Email from './email';
import PW from './pw';
import Logout from './logout';
import Delete from './delete';

// TODO need to create - actions for import * as actions from '../path'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    let start = {
      email: false,
      password: false,
      logout: false,
      delete: false
      
    };
    this.state = {
      ...start
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }


  setComponent = (e) => {
    e.preventDefault();
    Object.keys(this.state).forEach(component => {
      this.setState({[component]: false});
    });

    this.setState({[e.target.id]: true});
    
  }


  render() {

    return(
     
      <div>
      Hello, {this.state.username}
      
      <div> 
      <button onClick={this.setComponent} id="email">Change Email</button>
      <button onClick={this.setComponent} id="password">Change Password</button>
      <button onClick={this.setComponent} id="logout">Logout</button>
      <button onClick={this.setComponent} id="delete">Delete</button>
      </div>

      <div>
      {(this.state.email) ? <Email /> : null}
      {(this.state.password) ? <PW /> : null}
      {(this.state.logout) ? <Logout /> : null}
      {(this.state.delete) ? <Delete /> : null}
      </div>
      
      </div>
    )
  }
}


export default Profile;
