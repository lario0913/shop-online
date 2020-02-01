import {takeLatest, put, all, call} from 'redux-saga/effects'

import userActionTypes from './user.types'
import {signInSuccess, signInFailure} from './user.actions'

import {auth, googleProvider ,createUserProfileDocument } from '../../firebase/firebase.utils'

export function* getSnapshotFromUserAuth (auth){
    try {
        const userRef = yield call(createUserProfileDocument, auth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data}))

    }catch (error) {
        yield put(signInFailure(error))
    }
}


export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)

    }catch (error) {
        yield put(signInFailure(error))
    }
}
export function* signInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    }catch (error) {
        yield put(signInFailure(error))
    }
}


export function* onGoogleSignInStart () {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle)
}
export function* onEmailSignInStart () {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail)
}

export function* userSaga () {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}

