import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer/';
import reporter from '../middleware/reporter';
import thunk from '../middleware/thunk';


export const store = createStore(reducer, applyMiddleware(thunk, reporter));

