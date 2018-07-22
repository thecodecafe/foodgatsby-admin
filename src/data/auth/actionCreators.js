import axios from 'axios';
import { ActionTypes } from '../actionTypes';
import { URL, ENDPOINTS } from '../../configs/http.config';
import { ACCESS_TOKEN } from '../../configs/storage.config';
        
// login request action
const loginRequest = (creds) =>{
	return {
		type: ActionTypes.LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		message: null
	};
}
// receive login action
const loginSuccess = (token) =>{
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		failed: false,
		token: token
	};
}
// login error action
const loginFailure = (message) =>{
	return {
		type: ActionTypes.LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		failed: true,
		message: message
	};
}

// log user in
export const login = (creds) => {
	console.log(creds);
	console.log(`${URL}${ENDPOINTS.LOGIN}`);
	return dispatch => {
		dispatch( loginRequest() );
		axios({
			url: `${URL}${ENDPOINTS.LOGIN}`,
			method: 'POST',
			data: {email: creds.email, password: creds.password},
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(({data}) => {
			console.log(data);
			if(data && data.success){
				// store the token and 
				return;
			}
			dispatch( loginFailure('Email address or password is incorrect.') );
		}).catch((error) => {
			console.error(error);
			let {message, response} = error;
			dispatch( loginFailure(message) );
		});
	}
}

// checkAuth request action
const checkAuthRequest = (creds) =>{
	return {
		type: ActionTypes.CHECK_AUTH_REQUEST,
		isFetching: true,
		isAuthenticated: false,
	};
}
// receive checkAuth action
const checkAuthDone = (token) =>{
	return {
		type: ActionTypes.CHECK_AUTH_DONE,
		isFetching: false,
		isAuthenticated: token ? true : false,
		token: token
	};
}

// log user in
export const checkAuth = () => {
	return dispatch => {
		dispatch( checkAuthRequest() );

		setTimeout(() => {
			// get access token
			let token = localStorage.getItem(ACCESS_TOKEN);
	
			// if(token){
			// 	token = JSON.parse(token);
			// }
			
			dispatch( checkAuthDone(token || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6MSwiaWF0IjoxNTMyMDA2MDQ2LCJleHAiOjE1MzIwMTY4NDZ9.Jhlgrg0Qv7SQUDU_t-uiB82x8YfH2QyRO-qHJb2iI2k') );
		}, 100)
	}
}

// logout request action
const logoutRequest = () =>{
	return {
		type: ActionTypes.LOGOUT_REQUEST,
		isFetching: true,
		failed: false,
		message: null
	};
}
// receive logout action
const logoutSuccess = () =>{
	return {
		type: ActionTypes.LOGOUT_SUCCESS,
		isAuthenticated: false,
		isFetching: false,
		token: null
	};
}
// logout error action
const logoutFailure = (message) =>{
	return {
		type: ActionTypes.LOGOUT_FAILURE,
		message,
		failed: true,
		message: message
	};
}

// log user out
export const logout = () => {
	return dispatch => {
		console.log('Ahem');
		// request to logout
		dispatch( logoutRequest() );
		// delay logout success so that react know that state has changed
		setTimeout(() => {
			console.log('Yowlow');
			dispatch( logoutSuccess() );
		}, 1000);
	}
}