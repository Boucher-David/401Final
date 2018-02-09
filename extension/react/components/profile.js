import React from 'react';
import {connect} from 'react-redux';

// TODO need to create - actions for import * as actions from '../path'

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  

  setComponent = (e) => {
    this.props.toggle(e.target.id);

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
      
      </div>
    )
  }
}


export default Profile;
