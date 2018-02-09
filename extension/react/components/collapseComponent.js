import React from 'react';
import Collapsible from 'react-collapsible';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }



    render() {
        return (
            <Collapsible trigger={this.props.trigger}>
                {Object.keys(this.props.login).map((cred, i) => {
                    return <div>
                        <p>{this.props.login[cred]}</p>
                        <input 
                            key={i}
                            type={cred === 'password' ? 'password' : null}
                            value={this.props.login[cred]}
                            name={cred}
                        />
                    </div>
                })}
            </Collapsible>
        )
    }
}

export default CollapseComponent;