import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import RootReducer from './reducers/RootReducer';

const loggerMiddleware = createLogger();

function configureStore(initialState) {
    let middleware = [thunkMiddleware]
    if (process.env.NODE_ENV !== 'production') {
        middleware = [thunkMiddleware, loggerMiddleware]
    }

    return createStore(
        RootReducer,
        initialState,
        applyMiddleware(...middleware)
    )
}

let store = configureStore();
export default store;
