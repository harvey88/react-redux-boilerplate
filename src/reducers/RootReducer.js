import {combineReducers} from 'redux';
import ExampleReducer from './example';
import UserReducer from './secure';

const RootReducer = combineReducers(Object.assign({},
    ExampleReducer,
    UserReducer
));

export default RootReducer;