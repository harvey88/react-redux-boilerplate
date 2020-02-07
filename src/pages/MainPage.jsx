import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {additionActionCreator} from '../actions/exampleActionCreators';
import ActionButton from '../components/simple/ActionButton';

const mapStateToProps = state => {
    return {
        result: state.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        additionAction: () => dispatch(additionActionCreator()),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MainPage extends React.Component {

    render() {
        return (
            <h2>
                <div>main page, link to <Link to={'/login'}>login page</Link></div>
                <div>Result: {this.props.result}</div>
                <div><ActionButton onClick={this.props.additionAction} text={'Add'}/></div>
            </h2>
        )
    }
}
