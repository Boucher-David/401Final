import React from 'react';
// import auth from '../utils/auth';

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

  render() {
    return (
      <div>
          <label>
            <h2>Logout...</h2>
          </label>
          <button className="btnVault" onClick={this.handleSubmit}>Logout</button>

        </div>
    );
  }
}

export default Logout;
