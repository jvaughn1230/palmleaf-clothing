import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

export function* getSnapshopFromUserAuth(userAuth, additonalDetails){
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additonalDetails);
        console.log(userSnapshot);
        console.log(userSnapshot.data());  
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshopFromUserAuth, userAuth)
    } catch(error){
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION)
}

export function* userSagas(){
    yield all([])
}