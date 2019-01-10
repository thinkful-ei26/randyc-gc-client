import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { blocksReducer } from './blocksReducer';
import auth from './auth';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({

  usersReducer, blocksReducer, auth, form


})


export default rootReducer;