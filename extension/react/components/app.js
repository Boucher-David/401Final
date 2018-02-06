
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup';
import Home from './home';
import Profile from './profile/_profile';
import Tile from './tile';
import Signin from './signin';
import Verify from './verify';
import Unlock from './unlock';
import { toggle } from '../app/actions/displayActions'


class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('props: ', props);
   
  }

  render() {
    return (
      <div>
        {(this.props.display.home) ? <Home toggle={this.props.toggle} /> : null}
        {(this.props.display.signup) ? <Signup toggle={this.props.toggle}/> : null}
        {(this.props.display.signin) ? <Signin toggle={this.props.toggle}/> : null}
        {(this.props.display.profile) ? <Profile toggle={this.props.toggle}/> : null}
        {(this.props.display.verify) ? <Verify toggle={this.props.toggle}/> : null}
        {(this.props.display.unlock) ? <Unlock toggle={this.props.toggle}/> : null}
        {(this.props.display.tile) ? <Tile toggle={this.props.toggle}/> : null}
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
