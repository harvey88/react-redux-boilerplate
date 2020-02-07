import React from 'react';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as exampleActions from '../actions/exampleActionCreators'
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        secureActions: bindActionCreators(exampleActions, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class AnotherPage extends React.Component {

    render() {
        return (
            <h2>
                another page, link to <Link to={'/'}>main page</Link>
            </h2>
        )
    }
}

export default AnotherPage;