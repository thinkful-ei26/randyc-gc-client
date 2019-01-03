import { combineReducers } from 'redux';

import { usersReducer } from './usersReducer';
import { blocksReducer } from './blocksReducer';
import { inputReducer } from './inputReducer';

const rootReducer = combineReducers({

  usersReducer, blocksReducer, inputReducer


})


export default rootReducer;