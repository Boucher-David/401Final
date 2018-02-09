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
    this.state = {
      email: false,
      password: false,
      logout: false,
      delete: false
    };
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

      <div><button data-hover="click me!"><div>Hover me!</div></button>
      <button data-hover="Change Email?" className="container" onClick={this.setComponent} id="email"><div>Change Email</div></button>
      <button className="container" onClick={this.setComponent} id="password">Change Password</button>
      <button className="container" onClick={this.setComponent} id="logout">Logout</button>
      <button className="container" onClick={this.setComponent} id="delete">Delete</button>
      </div>

      <div>
      {(this.state.email) ? <Email /> : null}
      {(this.state.password) ? <PW /> : null}
      {(this.state.logout) ? <Logout toggle={this.props.toggle}/> : null}
      {(this.state.delete) ? <Delete toggle={this.props.toggle}/> : null}
      </div>

      </div>
    )
  }
}


export default Profile;
