import React from 'react';

class PW extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      password1: '',
      password2: ''
    };

  }

    handleSubmit = (e) => {
      e.preventDefault();
      if ((this.state.password1 || this.state.password2 !== '') && (this.state.password1 === this.state.password2)) {
  
        console.log('__SUBMIT_PASSWORD__');
              
      } else {
        return alert('Passwords must match and field cannot be blank');
      }
    }

    handleChange = (e) => {
      console.log(e.target.value, 'target')
  
      let {name, value} = e.target;
  
  
      this.setState({[name]:value});
    }
  

  render() {

    return (

      <div>
        
        <form onSubmit={this.handleSubmit}>
          <label>

            <span>Update Password</span>

            <input 
              type='text'
              name='password1'
              required='true'
              value={this.state.password1}
              onChange={this.handleChange}
              
            />

            <input
              type='text'
              name='password2'
              require='true'
              value={this.state.password2}
              onChange={this.handleChange}
            />
                  
          </label>
          <button type="submit">Save</button>
          
        </form>
      </div>
      
    )
  }
}

export default PW;