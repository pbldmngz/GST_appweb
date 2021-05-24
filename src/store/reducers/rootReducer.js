import authReducer from './authReducer'
import areaReducer from './areaReducer'
import procesoReducer from './procesoReducer'
import auditoriaReducer from './auditoriaReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    auditoria: auditoriaReducer,
    area: areaReducer,
    proceso: procesoReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object