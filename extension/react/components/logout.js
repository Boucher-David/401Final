import React from 'react';

class Logout extends React.Component {

  constructor(props) {
    super(props);

  }

  handleSubmit = (e) => {
    e.preventDefault();
      this.props.toggle('home');
      chrome.storage.sync.remove('vault');
      chrome.runtime.sendMessage({'setMK': false});

    }

  back = (e) => {
    e.preventDefault();
    this.props.toggle("tile");
  }

  render() {
    return (
      <div className="signup">
          <label>
            <h2>Logout...</h2>
          </label>
          <button onClick={this.handleSubmit}>Logout</button>
          <button onClick={this.back}>Back</button>
        </div>
    );
  }
}

export default Logout;
