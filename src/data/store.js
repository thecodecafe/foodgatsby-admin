import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as AuthReducers from './auth/reducers';
import * as UIReducers from './ui/reducers';

var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

var reducers = Object.assign({},
    AuthReducers, UIReducers
);

reducers = combineReducers(reducers);

var store = createStoreWithMiddleware(reducers);

export default store;