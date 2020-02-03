import {put, call, all, takeLatest} from 'redux-saga/effects'

import userActionTypes from '../user/user.types'
import {clearCart} from './cart.action'


export function* clearCartOnSignOut (){
    yield put(clearCart())
}


export function* onSignOutSuccess () {
    yield takeLatest (userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}


export function* cartSaga () {
    yield all ([
            call(onSignOutSuccess)
    ])
}

