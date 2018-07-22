import CreateReducer from "../../helpers/CreateReducer";
import { ActionTypes } from "../actionTypes";

export const appbar = CreateReducer({
    visible: false
}, {
    [ActionTypes.SHOW_APPBAR]: (state, action) => {
        return Object.assign({}, state, action);
    },
    [ActionTypes.HIDE_APPBAR]: (state, action) => {
        return Object.assign({}, state, action);
    }
});

export const drawer = CreateReducer({
    visible: false
}, {
    [ActionTypes.SHOW_DRAWER]: (state, action) => {
        return Object.assign({}, state, action);
    },
    [ActionTypes.HIDE_DRAWER]: (state, action) => {
        return Object.assign({}, state, action);
    }
});

export const menuName = CreateReducer({
    name: null
}, {
    [ActionTypes.SET_MENU_NAME]: (state, action) => {
        return Object.assign({}, state, action);
    }
});