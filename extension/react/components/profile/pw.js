import React from 'react';

class PW extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      password1: ''
    };

  }

  handleSubmit(e) {
    e.preventDefault();
      // this.props.updateUser(this.state)
      console.log('__SUBMIT__PASSWORD__')
    }
    handleChange(e) {
      let {name,value} = e.target;
      this.setState( {[name]: value} );
  }

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Update Password</span>
            <input 
              type='text'
              name='password'
              value={this.state.password}
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