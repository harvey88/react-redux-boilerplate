import {
    ADDITION_COMPLETE,
} from '../constants/actionTypes';
import Alert from 'react-s-alert';

// --------- addition actions --------------------------

const additionComplete = () => ({
    type: ADDITION_COMPLETE,
})

const additionActionCreator = () => dispatch => {
    Alert.success('Was added', {});
    return dispatch(additionComplete());
}

export {additionActionCreator};
