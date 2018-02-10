import React from 'react';
import {connect} from 'react-redux';

import Signup from './signup';
import Home from './home';
import Profile from './profile';
import Tile from './tile';
import Signin from './signin';
import Verify from './verify';
import Unlock from './unlock';
import Email from './email';
import PW from './pw';
import Logout from './logout';
import Delete from './delete';
import Cred from './cred';
import About from './about';

import { toggle } from '../app/actions/displayActions';


class App extends React.Component {

  constructor(props) {
    super(props);
  }


  _find = () => {
    let _user_id = false;
    let _mk = false;

    chrome.storage.sync.get('vault', response => {

      if (!response.vault) return this.props.toggle('home');
      if (response.vault.user_id) _user_id = true;
      chrome.runtime.sendMessage({'getMK': null}, (response) => {
        _mk = response;

        if (_mk && _user_id) return this.props.toggle('tile');

        if (_user_id) return this.props.toggle('unlock');

        return this.props.toggle('home');
      })
    });
  }

  // componentWillMount() {
  //   this._find();
  // }




  render() {

    return (
      <div>
        {(this.props.display.home) ? <Home toggle={this.props.toggle} /> : null}
        {(this.props.display.signup) ? <Signup toggle={this.props.toggle}/> : null}
        {(this.props.display.signin) ? <Signin toggle={this.props.toggle}/> : null}
        {(this.props.display.verify) ? <Verify toggle={this.props.toggle}/> : null}
        {(this.props.display.unlock) ? <Unlock toggle={this.props.toggle}/> : null}
        {(this.props.display.tile) ? <Tile toggle={this.props.toggle}/> : null}
        {(this.props.display.pw) ? <PW toggle={this.props.toggle}/> : null}
        {(this.props.display.delete) ? <Delete toggle={this.props.toggle}/> : null}
        {(this.props.display.email) ? <Email toggle={this.props.toggle}/> : null}
        {(this.props.display.logout) ? <Logout toggle={this.props.toggle}/> : null}
        {(this.props.display.cred) ? <Cred toggle={this.props.toggle}/> : null}
        {(this.props.display.about) ? <About toggle={this.props.toggle}/> : null}
        {(this.props.display.profile) ? <Profile toggle={this.props.toggle}/> : null}
        {(this.props.display.generator) ? <Generator toggle={this.props.toggle}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  display: state.display
});

const mapDispatchToProps = (dispatch, getState) => ({
  toggle: component => dispatch(toggle(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
