import React from 'react';
import {connect} from 'react-redux';
import Email from './email';
import PW from './pw';
import Logout from './logout';
import Delete from './delete';


class Profile extends React.Component {

  constructor(props) {
    super(props);
  }



  setComponent = (e) => {
    e.preventDefault();
    this.props.toggle(e.target.id);

  }
  back = (e) => {
    e.preventDefault();
    this.props.toggle("tile");
  }

  render() {

    return(
      <div className="profile">
        <h1 className="heading">Profile</h1>
        <button onClick={this.setComponent} id="email">Change Email</button>
        <button onClick={this.setComponent} id="pw">Change Password</button>
        <button onClick={this.setComponent} id="logout">Logout</button>
        <button onClick={this.setComponent} id="delete">Delete</button>
        <button onClick={this.back}>Back</button>
      </div>

    )
  }
}


export default Profile;
