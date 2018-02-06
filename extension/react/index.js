
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './components/app';

import './style/style.scss';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    test = (e) => {
        e.preventDefault();
        chrome.runtime.sendMessage({saveCredential: {
            nickname: 'amazon',
            credential: 'testing'
        }}, response => {
            console.log(response);
        });
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <button onClick={this.test}>Testing</button>
                </div>
            </Provider>
        )
    }

}
ReactDom.render(<Main />, document.getElementById('app'));
