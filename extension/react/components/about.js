import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    back = () => {
        this.props.toggle('profile');
    }
    render() {



        return (
            <div>
                <h2>About</h2>
                <button className="btnVault" onClick={this.back}>Back</button>
            </div>
        )

    }

}

export default About;