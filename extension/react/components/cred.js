import React from 'react';
import Collapsible from 'react-collapsible';
import triplesec from 'triplesec';

import superagent from 'superagent';

import CollapseComponent from './collapseComponent.js';

class Logins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logins: [],
            message: '',
            credentials: {}
        }
    }

    decryptPassword = (text, key) => {

        return new Promise((resolve, reject) => {
        triplesec.decrypt({
          data: new triplesec.Buffer(text, 'hex'),
          key: new triplesec.Buffer(key)
        }, (err, decryptString) => {
            if (err) return reject("Unable to decrypt credentials. Please check your master key.")
          resolve(decryptString.toString());
        })
      })
    };

    getCredential = (cred) => {
        let _obj = {};
        _obj.user_id = this.state.user_id;

        return new Promise((resolve, reject) => {
            superagent.get(`http://vault-extension.herokuapp.com/credential/get/${cred}`).set('Authorization', `Basic ${btoa(JSON.stringify(_obj))}`).then(response => {
            if (response.body.vault.success) {
                resolve(response.body.vault.credential);
              }
            })
          })
    }

    fill = () => {
        chrome.storage.sync.get('vault', r => {
            this.setState({user_id: r.vault.user_id});
            if (r.vault.logins.length === 0) return;

            if (r.vault.logins) this.setState({logins: r.vault.logins});

            let _state = {...this.state};

            this.state.logins.map(login => {
                _state.credentials[login] = {}
            });

            this.setState(_state);
        });
    }

    get = (cred) => {
        this.setState({message: 'Credentials Are Loading'});
        let _state = {...this.state};

        chrome.runtime.sendMessage({'getCredential': null}, _p => {
            this.getCredential(cred).then(_l => {
                this.decryptPassword(_l, _p).then(_x => {

                    Object.keys(JSON.parse(_x)).forEach(_u => {
                        _state.credentials[cred][_u] = JSON.parse(_x)[_u];
                    });
                    this.setState({_state});
                    this.setState({message: `${cred} has loaded. Click again.`});
                });
            });
        })
    }

    componentWillMount() {
        this.fill();
    }



    deleteCred = (cred) => {
        chrome.runtime.sendMessage({'deleteCredential': cred});
        this.setState({
            logins: this.state.logins.filter((_, i) => _ !== cred)
        });
        this.setState({message: ''})
    }

    generateKey = (d='123') => {
        return `${d}_${Math.floor(Math.random() * 25000) + 1}`;
    }

    back = () => {
        this.props.toggle('tile');
    }

    remove = (cred) => {
        let _state = {...this.state};
        _state.credentials[cred] = {};
        _state.message = '';
        this.setState(_state);
    }
  render() {
    return(

        <div className="signup">   

            {(Object.keys(this.state.credentials).length > 0) ?  this.state.logins.map((login, i) => <CollapseComponent remove={this.remove} get={this.get} delete={this.deleteCred} key={this.generateKey(login)} trigger={login} login={this.state.credentials}/>) : null }
            <button className='btnVault' onClick={this.back}>Back</button>
            <div>{this.state.message}</div>
         </div>

    );
  }

}

export default Logins;
