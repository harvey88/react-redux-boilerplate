import {setCookie} from '../utils/functions';
import http from '../utils/httpService';
import {
    GET_PROFILE_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
} from '../constants/routes';

import {
    GET_CURRENT_USER_COMPLETE,
    GET_CURRENT_USER_FAILED,
    GET_CURRENT_USER_REQUEST,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    REGISTER_REQUEST_COMPLETE
} from '../constants/actionTypes';

// --------- login actions --------------------------

const loginRequest = obj => ({
        type: LOGIN_REQUEST,
        obj
    });

// const loginRequestFail = (err) => {
//     return {
//         type: LOGIN_REQUEST_FAILED,
//         err
//     };
// }

// const loginRequestComplete = (userInfo) => {
//     return {
//         type: LOGIN_REQUEST_COMPLETE,
//         userInfo
//     };
// }

const getCurrentUserRequest = obj => ({
    type: GET_CURRENT_USER_REQUEST,
    obj
});

const getCurrentUserComplete = userInfo => ({
    type: GET_CURRENT_USER_COMPLETE,
    userInfo
})

const getCurrentUserFail = err => ({
    type: GET_CURRENT_USER_FAILED,
    err
});

const login = (obj, hashHistory) => dispatch => {
        dispatch(loginRequest(obj));
        return http.doPost(LOGIN_ROUTE, obj, data => {
            let token = 'Bearer ' + data.access_token;
            setCookie('Auth', token, 100);

            dispatch(getCurrentUserRequest());
            return http.doGet(
                GET_PROFILE_ROUTE,
                data => {
                    dispatch(getCurrentUserComplete(data));
                    hashHistory.push(`/profile/${data.id}`);
                },
                e => dispatch(getCurrentUserFail(e))
            );
        });
    };

const getCurrentUser = () => dispatch => {
    dispatch(getCurrentUserRequest());
    return http.doGet(
        GET_PROFILE_ROUTE,
        data => dispatch(getCurrentUserComplete(data)),
        e => dispatch(getCurrentUserFail(e))
    );
};

// --------- user registration actions -----------

const registerRequest = obj => ({
        type: REGISTER_REQUEST,
        obj
    });

const registerRequestComplete = data => ({
        type: REGISTER_REQUEST_COMPLETE,
        data
    });

// const registerRequestFail = (err) => {
//     return {
//         type: REGISTER_REQUEST_FAILED,
//         err
//     };
// }

const register = (obj, hashHistory) => dispatch => {
        dispatch(registerRequest(obj));
        return http.doPost(REGISTER_ROUTE, obj, data => {
            dispatch(registerRequestComplete(data));
            hashHistory.push('/successfulRegister');
        });
    };

// --------- logout actions -----------

export {login, register, getCurrentUser};
