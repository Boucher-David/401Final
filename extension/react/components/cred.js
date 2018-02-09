import React from 'react';
import Collapsible from 'react-collapsible';


import CollapseComponent from './collapseComponent.js';


class Logins extends React.Component {

            state = {
            logins: ['facebook', 'amazon', 'google'],
            message: 'hello',
            credentials: {
                amazon: {
                    username: 'username',
                    email: 'email',
                    password: 'password'
                },
                facebook: {
                    username: 'username',
                    email: 'email',
                    password: 'password'
                },
                google: {
                    username: 'username',
                    email: 'email',
                    password: 'password'
                }

                
            }
        
    }



  render() {
    return(

        <div>
            {this.state.logins.map((login, i) => <CollapseComponent key={i} trigger={login} login={this.state.credentials[login]}/>)}

         </div>

    );
  }

}


{/* <Collapsible trigger={login}>
                    
{
    Object.keys(this.state.credentials[login]).map( (cred,i) => {
    
        <div>
            <p>{this.state.credentials[login]['username']}:</p>
            <input 
            key={i}
            type={cred === 'password' ? 'password' : null}
            value={this.state.credentials[login][cred]}
            name={cred}
            />
        </div>
    })
}       

</Collapsible> */}

export default Logins;

