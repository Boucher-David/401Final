import React from 'react';

class Logout extends React.Component {

  constructor(props) {
    super(props);

  }

  handleSubmit = (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({'changeLogo': 'VaultLogoLogout.png'});
    chrome.storage.sync.remove('vault');
    chrome.runtime.sendMessage({'setMK': false});
      this.props.toggle('home');

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
