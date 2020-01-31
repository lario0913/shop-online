import ShopActionTypes from './shop.types'
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'


export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionFail = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAIL,
    payload : errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionStart())

        collectionRef
        .get()
        .then(async snapshot => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot)
            dispatch(fetchCollectionSuccess(collectionMap))
            // // updateCollections(collectionMap)
            // this.setState({loading:false})
        })
        .catch(error => dispatch(fetchCollectionFail(error.message)))
    }
}

