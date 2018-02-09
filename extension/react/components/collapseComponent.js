import React from 'react';
import Collapsible from 'react-collapsible';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props);
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

    copy = (e) => {
        var copyFrom = document.createElement("textarea");
        copyFrom.textContent = e;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        body.removeChild(copyFrom);
    }

    render() {
        return (

            <Collapsible onClick={this._fetch} key={this.generateKey('collapsable')} trigger={this.props.trigger} >


                {Object.keys(this.props.login[this.props.trigger]).map((cred, i) => {

                    return <div key={this.generateKey('div')}>
                        <div>{cred}</div>
                        <input 
                            type={cred === 'password' ? 'password' : null}
                            value={this.props.login[this.props.trigger][cred]}
                            name={cred}
                        />
                        {(cred === 'password') ? <button onClick={() => this.copy(this.props.login[this.props.trigger][cred])}>Copy Password</button> : null}
                    </div>
                })}
                
                <button onClick={() => this.deleteCred(this.props.trigger)}>Delete Credential</button>
            </Collapsible>
        )
    }
}

export default CollapseComponent;