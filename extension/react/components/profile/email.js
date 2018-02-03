import React from 'react';

class Email extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: ''
    };

    
  }
    handleChange(e) {
      let {name,value} = e.target;
      this.setState( {[name]: value} );
  }

  handleSubmit(e) {
    e.preventDefault();
      // this.props.updateUser(this.state)
      console.log('__SUBMIT__EMAIL__');
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
              value={this.state.email}
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