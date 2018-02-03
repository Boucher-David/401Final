
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './components/app';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <App />
                </div>
            </Provider>
        )
    }

}
ReactDom.render(<Main />, document.getElementById('app'));
