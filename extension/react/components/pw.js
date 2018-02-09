import React from 'react';
import superagent from 'superagent';

class PW extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword1: '',
      message: ''
    };

  }

    handleSubmit = (e) => {
      e.preventDefault();

      if ((this.state.newPasword || this.state.newPassword1 !== '') && (this.state.newPassword === this.state.newPassword1)) {
        this.setState({message: ''});
        chrome.storage.sync.get('vault', response => {
          this.setState({'user_id': response.vault.user_id});
       
          let _string = JSON.stringify(this.state);
    
          superagent.post('http://localhost:3000/profile/update/password').set('Authorization', `Basic ${btoa(_string)}`).then(res => {
            if (!res.body.update) return this.setState({'message': 'Failed to update. Check passwords.'})
            chrome.runtime.sendMessage({'setMK': false}, r => {
              chrome.storage.sync.remove('vault');
              this.props.toggle('signin');
            });
          });
    
        });
              
      } else {
        this.setState({message: 'New passwords must match and cannot be blank'});
      }
    }

    handleChange = (e) => {
  
      let {name, value} = e.target;
  
  
      this.setState({[name]:value});
    }
  

  render() {

    return (

      <div>
        
        <form onSubmit={this.handleSubmit}>
          <label>

            <span>Update Password</span>
            < br/>
            <input 
              type='text'
              name='oldPassword'
              placeholder='Enter old password'
              required='true'
              value={this.state.password1}
              onChange={this.handleChange}
              
            />

            <input
              type='text'
              name='newPassword'
              placeholder='Enter new password'
              require='true'
              value={this.state.password2}
              onChange={this.handleChange}
            />

          <input
              type='text'
              name='newPassword1'
              placeholder='Enter old password again'
              require='true'
              value={this.state.password2}
              onChange={this.handleChange}
            />
                  
          </label>
          <button className="btnVault" type="submit">Save</button>
          
        </form>
        <p>{this.state.message}</p>
      </div>
      
    )
  }
}

export default PW;