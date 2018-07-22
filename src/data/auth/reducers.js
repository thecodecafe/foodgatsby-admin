import CreateReducer from '../../helpers/CreateReducer';
import { ActionTypes } from '../actionTypes';

export const auth = CreateReducer(
    {
        isFetching: false,
        isAuthenticated: false,
        failed: false,
        message: false,
    }, 
    {
        [ActionTypes.LOGIN_REQUEST]: (state, action) => {
            return Object.assign({}, state, action);
        },
        [ActionTypes.LOGIN_SUCCESS]: (state, action) => {
            return Object.assign({}, state, action);
        },
        [ActionTypes.LOGIN_FAILURE]: (state, action) => {
            return Object.assign({}, state, action);
        },
        [ActionTypes.CHECK_AUTH_DONE]: (state, action) => {
            return Object.assign({}, state, action);
        },
        [ActionTypes.LOGOUT_SUCCESS]: (state, action) => {
            return Object.assign({}, state, action);
        }
    }
);

export const checkingAuth = CreateReducer(
    {
        isFetching: false,
        isAuthenticated: false,
        failed: false,
        message: false
    }, 
    {
        [ActionTypes.CHECK_AUTH_REQUEST]: (state, action) => {
            return Object.assign({}, state, action);
        },
        [ActionTypes.CHECK_AUTH_DONE]: (state, action) => {
            return Object.assign({}, state, action);
        }
    }
);

export const loggingOut = CreateReducer({
    isFetching: false,
    failed: false,
    message: false
}, {
    [ActionTypes.LOGOUT_REQUEST]: (state, action) => Object.assign({}, state, action),
    [ActionTypes.LOGOUT_SUCCESS]: (state, action) => Object.assign({}, state, action),
    [ActionTypes.LOGOUT_FAILURE]: (state, action) => Object.assign({}, state, action)
})