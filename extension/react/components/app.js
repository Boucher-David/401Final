
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup';
import Home from './home';
import Profile from './profile/_profile';

import Verify from './verify';
import Unlock from './unlock';


class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('props: ', props);
  }

  render() {
    return (
      <div>
        {(this.props.display.home) ? <Home /> : null}
        {(this.props.display.signup) ? <Signup /> : null}
        {(this.props.display.profile) ? <Profile /> : null}
        {(this.props.display.verify) ? <Verify /> : null}
        {(this.props.display.unlock) ? <Unlock /> : null}
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
