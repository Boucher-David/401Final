
import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Paste components in here</div>
    )
  }
}

const mapStateToProps = (state) => ({
state
});

const mapDispatchToProps = (dispatch, getState) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);