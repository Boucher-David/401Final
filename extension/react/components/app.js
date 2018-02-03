
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup/_signup';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Signup />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
state
});

const mapDispatchToProps = (dispatch, getState) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);