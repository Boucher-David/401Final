import React from 'react';
import Collapsible from 'react-collapsible';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log('login: ',this.props);
    }

    _fetch = () => {
        this.props.fetch(this.props);
    }

    generateKey = (d='123') => {
        return `${d}_${Math.floor(Math.random() * 25000) + 1}`;
    }

    deleteCred = (login) => {
        this.props.delete(login);
    }

    render() {
        return (

            <Collapsible onClick={this._fetch} key={this.generateKey('collapsable')} trigger={this.props.trigger} >
            

                {Object.keys(this.props.login[this.props.trigger]).map((cred, i) => {
                    return <div key={this.generateKey('div')}>

                        <input 
                            type={this.props.login[cred] === 'password' ? 'password' : null}
                            value={this.props.login[cred][i]}
                            name={cred}
                        />
                    </div>
                })}
                <div onClick={() => this.deleteCred(this.props.trigger)}>Delete Credential</div>
            </Collapsible>
        )
    }
}

export default CollapseComponent;