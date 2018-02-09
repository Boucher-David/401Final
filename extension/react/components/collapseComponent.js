import React from 'react';
import Collapsible from 'react-collapsible';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    _fetch = () => {
        this.props.fetch(this.props);
    }

    generateKey = (d='123') => {
        return `${d}_${new Date().getTime()}`;
    }

    render() {
        return (
            <div onClick={this._fetch}>
            <Collapsible onClick={this._fetch} key={this.generateKey} trigger={this.props.trigger} >
                {Object.keys(this.props.login).map((cred, i) => {

                    return <div key={this.generateKey}>
                        <p>{this.props.login}</p>
                        <input 
                            type={cred === 'password' ? 'password' : null}
                            value={this.props.login[cred]}
                            name={cred}
                        />
                    </div>
                })}
            </Collapsible>
            </div>
        )
    }
}

export default CollapseComponent;