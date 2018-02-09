import React from 'react';
import Collapsible from 'react-collapsible';


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

    handleChange = (e) => {
        console.log(e.target.value, 'target')
    
        let {name, value} = e.target;
    
        this.setState({[name]:value});
      }

    //   category = () => {
    //     this.state.logins.map((login, i) => {
    //         let category = {};
    //         category[login] = {};
    //         this.setState({credentials: category});
    //     })
    //     return category();
    //     console.log(this.state);
    //   }


  render() {
    return(

        <div>

            { 
                this.state.logins.map( (login,i) =>
                    <Collapsible trigger={login}>
                    
                        {
                            Object.entries(this.state.credentials[login]).map( (cred,i) => {
                            
                                <div key={i}>
                                    <p>{cred}:</p>
                                    <input 
                                    type={cred === 'password' ? 'password' : null}
                                    value={this.state.credentials[login][cred]}
                                    name={cred}
                                    />
                                </div>
                            })
                        }       

                    </Collapsible>
                )
            }

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

