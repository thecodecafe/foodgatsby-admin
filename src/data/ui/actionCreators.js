import { ActionTypes } from "../actionTypes";

/**
 * makes the app bar visible
 */
export const showAppbar = () => ({
    type: ActionTypes.SHOW_APPBAR,
    visible: true
});

/**
 * hides the app bar
 */
export const hideAppbar = () => ({
    type: ActionTypes.HIDE_APPBAR,
    visible: false
});

/**
 * makes the drawer visible
 */
export const showDrawer = () => ({
    type: ActionTypes.SHOW_DRAWER,
    visible: true,
});

/**
 * hides the drawer
 */
export const hideDrawer = () => ({
    type: ActionTypes.HIDE_DRAWER,
    visible: false,
});

/**
 * sets menu name
 */
export const setMenuName = (name) => ({
    type: ActionTypes.SET_MENU_NAME,
    name: name,
});