
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup/_signup';
import Home from './home';


class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Signup />
        <Home />
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
