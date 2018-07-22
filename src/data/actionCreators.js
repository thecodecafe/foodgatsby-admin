import * as UIActionCreators from './ui/actionCreators';
import * as AuthActionCreators from './auth/actionCreators';

export const ActionCreators = Object.assign({}, UIActionCreators, AuthActionCreators);