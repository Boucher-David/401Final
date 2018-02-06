import React from 'react';

class Email extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email2: ''
    };

  }

  handleChange = (e) => {
    console.log(e.target.value, 'target')

    let {name, value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
      // this.props.updateUser(this.state)
    // if (this.state.email === this.state.email2) 
    if ((this.state.email || this.state.email2 !== '') && (this.state.email === this.state.email2)) {

      console.log('__SUBMIT_EMAIL__', this.state.email2);
            
    } else {
      return alert('Email must match and field no blank');
    }
      
   
  }

  

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Update Email</span>
            <input 
              type='text'
              name='email'
              required='true'
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              type='text'
              name='email2'
              required='true'
              value={this.state.email2}
              onChange={this.handleChange}
            />
                  
          </label>
          <button type="submit">Save</button>
          
        </form>
    
        
      
        
      </div>
      
    )
  }
}


export default Email;