import React from 'react';

class Generator extends React.Component {
    constructor(props) {
        super(props);
    }

    back = (e) => {
        e.preventDefault();
        this.props.toggle('tile');
    }
    render() {



        return (
            <div>
                <h2>PW Generator</h2>
                <button className="btnVault" onClick={this.back}>Back</button>
            </div>
        )

    }

}

export default Generator;