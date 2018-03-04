import {
	ADDITION_COMPLETE
} from '../constants/actionTypes'

const initialState = 0;

const additionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDITION_COMPLETE: {
            //let newState = JSON.parse(JSON.stringify(state)); //only for nested objects
            let newState = state
            newState++;
            return newState;
        }

        default:
            return state
    }
};

const additionErrorReducer = (state = null, action) => {
    switch (action.type) {
        case 'ADDITION_FAILED': {
            let newState = {...state}
            newState = action.err
            return newState
        }

        default:
            return state;
    }
}

const MessagesReducer = {
    result: additionReducer,
    resultError: additionErrorReducer
};

export default MessagesReducer;