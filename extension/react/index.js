
import React from 'react';
import ReactDom from 'react-dom'


class Main extends React.Component {
    
    constructor(props) { 
        super(props);
    }
    
    render() {
        return (
            <div>Testing React App!</div>
        )
    }
    
}
ReactDom.render(<Main />, document.getElementById('app'));