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
    this.state = {
      email: true,
      password1: true,
      logout: true,
      delete: true
    };
  }

  // componentWillReceiveProps(props) {
  //   if(this.props.profile) {this.setState(this.props.profile)}
  // }

  render() {

    return(
      <div>
        Hello, {this.state.username}
        {(this.state.email) ? <Email /> : null}
        {(this.state.password1) ? <PW /> : null}
        {(this.state.logout) ? <Logout /> : null}
        {(this.state.delete) ? <Delete /> : null}
        {/* <button id="email" onClick={this.handleChange}>Update Email</button> */}
      </div>
    )
  }
}


export default Profile;
