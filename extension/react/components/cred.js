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
            message: 'hello',
            credentials: {
            }
    }
    }

    decryptPassword = (text, key) => {

        return new Promise((resolve, reject) => {
        triplesec.decrypt({
          data: new triplesec.Buffer(text, 'hex'),
          key: new triplesec.Buffer(key)
        }, (err, decryptString) => {
          resolve(decryptString.toString());
        })
      })
    };

    getCredential = (cred) => {
        let _obj = {};
        _obj.user_id = this.state.user_id;
        return new Promise((resolve, reject) => {
            superagent.get(`http://localhost:3000/credential/get/${cred}`).set('Authorization', `Basic ${btoa(JSON.stringify(_obj))}`).then(response => {

            if (response.body.vault.success) {
                resolve(response.body.vault.credential);
              }
            })
          })
    }

    componentWillMount() {
        chrome.storage.sync.get('vault', r => {
            
            this.setState({user_id: r.vault.user_id});

            if (r.vault.logins) this.setState({logins: r.vault.logins});

            let _state = {...this.state};

            this.state.logins.map(login => {
                _state.credentials[login] = {}
            });

            this.setState(_state);
        });
    }

    fetchCred = (login) => {

        if (Object.keys(login.login).length === 0) return;
        chrome.runtime.sendMessage({'getCredential': login.trigger}, rrr => {
            this.getCredential(login.trigger).then(fff => {

                this.decryptPassword(fff, rrr).then(x => {
                    let _y = this.state;

                    _y.credentials[login.trigger] = JSON.parse(x);

                    this.setState(_y);

                });
            })
        });
    }

    generateKey = (d) => {
        return `${d}_${new Date().getTime()}`;
    }

  render() {
    return(

        <div>

            {(Object.keys(this.state.credentials).length > 0) ?  this.state.logins.map((login, i) => <CollapseComponent key={this.generateKey(login)} fetch={this.fetchCred} trigger={login} login={this.state.credentials}/>) : null }

         </div>

    );
  }

}

export default Logins;

