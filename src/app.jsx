import React from 'react'
import ReactDOM from 'react-dom';
//import {ThemeProvider} from 'styled-components';
import {Switch, Route} from 'react-router-dom'
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './Store.js';
import '../styles/common.less';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/error';
import Login from './pages/LoginPage';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
        <HashRouter>
            <React.Fragment>
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/errorPage' component={ErrorPage}/>
            </Switch>
                <Alert stack={{limit: 6}}
                       key='alert'
                       effect='scale'
                       timeout={5000}
                       position='top-right'
                />
            </React.Fragment>
        </HashRouter>
    </Provider>,
    document.getElementById('mount')
    )
}

render()

if (module.hot) {

    module.hot.accept()
    render()
}