import {all, call} from 'redux-saga/effects'

import {fetchCollectionsStart} from './shop/shop.sagas'
import {userSaga} from './user/user.sagas'

export default function* rootSaga(){
    yield all([
        call(fetchCollectionsStart),
        call(userSaga)
    ])
}

