import React from 'react';
// import auth from '../utils/auth';

class Logout extends React.Component {

  
  componentDidMount(){
    // auth.deleteToken();
    // this.props.router.push('/'); //redirect
  }

  handleSubmit(e) {
    e.preventDefault();
      // this.props.updateUser(this.state)
      console.log('__SUBMIT__LOGOUT__')
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Logout...</h2>      
          </label>
          <button type="submit">Logout</button>
          
        </form>
    );
  }
}

// Logout.propTypes = {
//   router: PropTypes.object.isRequired
// };

export default Logout;