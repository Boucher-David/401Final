
import React from 'react';
import {connect} from 'react-redux';
import Signup from './signup';
import Home from './home';

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
        {(this.props.display.verify) ? <Verify /> : null}
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
