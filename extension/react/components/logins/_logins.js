import React from 'react';
import Collapsible from 'react-collapsible';


class Logins extends React.Component {

            state = {
            login: ['facebook', 'amazon', 'google'],
            message: 'hello',
            credentials: {
                username: 'Vault Team',
                email: 'email',
                password: 'password'
            }
        

       
    }


  render() {
    console.log(Object.entries(this.state.credentials))
    return(

    <div>
        
      <Collapsible trigger='FB'>
    {/* {Object.keys(this.state.credentials).map((value, i) => <h1 key={i}> {value} Sidney </h1>)} */}

    {Object.entries(this.state.credentials).map((value, i) => 
            <div>
                <p>{value[0]}:</p>
                <input 
                key={i}
                type={value[0] === 'password' ? 'password' : null}
                value={value[1]}
                name={value[0]}
                />
            </div>
            )}
      </Collapsible>
       

         <div>
        <Collapsible trigger='amazon'>
        {Object.entries(this.state.credentials).map((value, i) => 
            <div>
                <p>{value[0]}:</p>
                <input 
                key={i}
                type={value[0] === 'password' ? 'password' : 'text'}
                value={value[1]}
                name={value[0]}
                />
            </div>
            )}
        </Collapsible>
        </div> 

        <div>
        <Collapsible trigger='google'>
        {Object.entries(this.state.credentials).map((value, i) => 
            <div>
                <p>{value[0]}:</p>
                <input 
                key={i}
                type={value[0] === 'password' ? 'password' : 'text'}
                value={value[1]}
                name={value[0]}
                />
            </div>
            )}
         </Collapsible>
         </div> 
         
         </div>

    );
  }

}

export default Logins;

