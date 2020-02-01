import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {persistStore} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

// import thunk from 'redux-thunk'

import rootReducer from './root.reducer'
import rootSaga from './root.saga'



// const middlewares = [thunk]

const sagaMiddleWare = createSagaMiddleware()
const middlewares = [sagaMiddleWare]

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleWare.run(rootSaga)


export const persistor = persistStore(store)

export default {store, persistor}