import {takeLatest, call, put} from 'redux-saga/effects'
import shopActionTypes from './shop.types'
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionSuccess, fetchCollectionFail} from '../shop/shop.action'

export function* fetchCollectionsAsync (){
    yield console.log('No lele')

    try{
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionMap =  yield call(convertCollectionSnapshotToMap, snapshot)
        yield put(fetchCollectionSuccess(collectionMap))

    }catch(error) {
        yield put(fetchCollectionFail(error.message))
    }
}


export function* fetchCollectionsStart (){
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}