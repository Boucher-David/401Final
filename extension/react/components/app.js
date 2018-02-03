
import React from 'react';
import {connect} from 'react-redux';
import Home from './home';

class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
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
