import React from 'react';
import {connect} from 'react-redux';
import Email from './email';
import PW from './pw';
import Logout from './logout';
import Delete from './delete';

// TODO need to create - actions for import * as actions from '../path'

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }



  setComponent = (e) => {
    e.preventDefault();
    this.props.toggle(e.target.id);

  }
  goBack = (e) => {
    e.preventDefault();
    this.props.toggle('tile');
  }

  render() {

    return(
      <div>
        <button data-hover="click me!"><div>Hover me!</div></button>
        <button data-hover="Change Email?" className="container" onClick={this.setComponent} id="email"><div>Change Email</div></button>
        <button className="container" onClick={this.setComponent} id="password">Change Password</button>
        <button className="container" onClick={this.setComponent} id="logout">Logout</button>
        <button className="container" onClick={this.setComponent} id="delete">Delete</button>
        <button className="btnVault" onClick={this.goBack}>Back</button>
      </div>

    )
  }
}


export default Profile;
