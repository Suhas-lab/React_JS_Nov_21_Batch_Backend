import { createStore, combineReducers } from 'redux';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer
    // eventSaveReducer: eventSaveReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;