import React from 'react';
import {Form, Field} from 'react-final-form';
import {composeValidators, emailField, passwordField, requiredField} from '../utils/fields_validation';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as secureActions from '../actions/secure'

import ActionButton from '../components/simple/ActionButton';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        secureActions: bindActionCreators(secureActions, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {

    onSubmit = values => {
        const reqObject = {
            username: values.email,
            password: values.password,
        }
        this.props.secureActions.login(reqObject, this.props.history);
    };

    render() {
        return (
            <div className='auth_page flex-col'>
                <Form
                    onSubmit={this.onSubmit}
                    render={({handleSubmit, submitting}) => (
                        <form onSubmit={handleSubmit} className='auth_page_form'>
                            <Field name='email' validate={composeValidators(requiredField, emailField)}>
                                {({input, meta}) => (
                                    <div className='auth_page_form_field flex-col'>
                                        <input {...input}
                                               type='text'
                                               placeholder='Ваш Email'
                                               className={'auth_page_form_field_input ' + ((meta.error && meta.touched) ? 'auth_page_form_field_input_error' : '')}
                                        />
                                        {meta.error && meta.touched &&
                                        <span className='auth_page_form_field_error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name='password' validate={composeValidators(requiredField, passwordField)}>
                                {({input, meta}) => (
                                    <div className='auth_page_form_field flex-col'>
                                        <input {...input}
                                               type='password'
                                               placeholder='Ваш пароль'
                                               className={'auth_page_form_field_input ' + ((meta.error && meta.touched) ? 'auth_page_form_field_input_error' : '')}
                                        />
                                        {meta.error && meta.touched &&
                                        <span className='auth_page_form_field_error'>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <div className='auth_page_form_controls flex-col'>
                                <ActionButton text='Login' type='primary' actionType='submit'
                                              disabled={submitting}/>
                            </div>
                        </form>
                    )}
                />
                <div>
                    <Link to={'/'}>main page</Link>
                </div>
            </div>
        )
    }
}

export default Login;