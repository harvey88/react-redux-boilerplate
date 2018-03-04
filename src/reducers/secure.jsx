import {
    LOGIN_REQUEST_COMPLETE,
    LOGIN_REQUEST_FAILED,
    REGISTER_REQUEST_COMPLETE,
    REGISTER_REQUEST_FAILED,
    LOGOUT,
    GET_CURRENT_USER_COMPLETE,
    GET_CURRENT_USER_FAILED,
    GET_CURRENT_USER_REQUEST,
    LOGIN_REQUEST
} from '../constants/actionTypes'

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST_COMPLETE:
            return { ...action.userInfo }

        case LOGIN_REQUEST_FAILED: {
            let newState = { ...initialState }
            newState.err = action.err
            return newState
        }

        case REGISTER_REQUEST_COMPLETE:
            return { ...action.data }

        case REGISTER_REQUEST_FAILED: {
            let newState = { ...initialState }
            newState.err = action.err
            return newState
        }

        case GET_CURRENT_USER_COMPLETE: {
            let newState =  action.userInfo
            return newState
        }

        case LOGOUT:
            return initialState;

        default:
            return state
    }
};

const getUserErrorReducer = (state = null, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_FAILED:
            return action.err;
        case GET_CURRENT_USER_COMPLETE:
        case GET_CURRENT_USER_REQUEST:
        case LOGIN_REQUEST:
        case LOGIN_REQUEST_COMPLETE:
            return null;
        default:
            return state;
    }
}

const UserReducer = {
    user: userReducer,
    userProfileError: getUserErrorReducer
};

export default UserReducer;