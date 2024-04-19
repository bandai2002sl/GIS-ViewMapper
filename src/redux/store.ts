import authReducer from './reducer/auth';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import siteReducer from './reducer/site';
import thunk from 'redux-thunk';
import userReducer from './reducer/user';
import reportReducer from './reducer/report';
import notificationReducer from './reducer/notification';
import accountReducer from "./reducer/account"
import modalReducer from './reducer/modal'

const reducers = combineReducers({
	auth: authReducer,
	user: userReducer,
	site: siteReducer,
	report: reportReducer,
	notification: notificationReducer,
	account: accountReducer,
	modal: modalReducer
});

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
