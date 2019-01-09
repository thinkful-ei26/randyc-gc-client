import { combineReducers } from 'redux';

import { usersReducer } from './usersReducer';
import { blocksReducer } from './blocksReducer';


const rootReducer = combineReducers({

  usersReducer, blocksReducer


})


export default rootReducer;