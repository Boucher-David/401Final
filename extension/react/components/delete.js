import React from 'react';

class Delete extends React.Component {


  handleSubmit(e) {
    e.preventDefault();
      chrome.storage.sync.get('vault', r => {
        // need to write backend method to delete all credentials.
      });

    }
    back = (e) => {
      e.preventDefault();
      this.props.toggle("tile");
    }

  render() {
    return (
      <form className="signup">
          <label>
            <h2 className="heading">Delete</h2>
            <p>Delete all stored credentials from your account</p>
          </label>
          <button onClick={this.handleSubmit}>Delete</button>
          <button onClick={this.back}>Back</button>

        </form>
    );
  }
}


export default Delete;
