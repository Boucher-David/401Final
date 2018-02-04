import React from 'react';
// import auth from '../utils/auth';

class Delete extends React.Component {


  handleSubmit(e) {
    e.preventDefault();
      // this.props.updateUser(this.state)
      console.log('__SUBMIT__DELETE__')
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Delete</h2>      
          </label>
          <button type="submit">Delete</button>
          
        </form>
    );
  }
}


export default Delete;