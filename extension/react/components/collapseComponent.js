import React from 'react';
import Collapsible from 'react-collapsible';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    _fetch = () => {
        if (Object.keys(this.props.login[this.props.trigger]).length > 0) return ;
        this.props.get(this.props.trigger);
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
    
    remove = () => {
        this.props.remove(this.props.trigger);
    }

    render() {


        return (

            <Collapsible onClose={this.remove} onOpening={this._fetch}  key={this.generateKey('collapsible')} trigger={this.props.trigger} >


                {Object.keys(this.props.login[this.props.trigger]).map((cred, i) => {

                    return <div key={this.generateKey('div')}>
                        <div>{cred}</div>
                        <input 
                            type={cred === 'password' ? 'password' : null}
                            value={this.props.login[this.props.trigger][cred]}
                            name={cred}
                        />
                        {(cred === 'password') ? <button className='btnVault' onClick={() => this.copy(this.props.login[this.props.trigger][cred])}>Copy Password</button> : null}
                    </div>
                })}
                
                <button className='btnVault' onClick={() => this.deleteCred(this.props.trigger)}>Delete Credential</button>
            </Collapsible>
        )
    }
}

export default CollapseComponent;