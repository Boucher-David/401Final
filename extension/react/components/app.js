
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup';
import Home from './home';
import Profile from './profile/_profile';
import Tile from './tile';
import Signin from './signin';
import Verify from './verify';
import Unlock from './unlock';


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let MK = chrome.runtime.sendMessage({getMK: null}, response => response);
    let user_id = chrome.storage.sync.get('Vault', response => response);

    if (MK && user_id) this.props.toggle('Tile');
    if (user_id) this.props.toggle('Unlock');    
  }

  render() {
    return (
      <div>
        {(this.props.display.home) ? <Home /> : null}
        {(this.props.display.signup) ? <Signup /> : null}
        {(this.props.display.signin) ? <Signin /> : null}
        {(this.props.display.profile) ? <Profile /> : null}
        {(this.props.display.verify) ? <Verify /> : null}
        {(this.props.display.unlock) ? <Unlock /> : null}
        {(this.props.display.tile) ? <Tile /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  display: state.display
});

const mapDispatchToProps = (dispatch, getState) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
