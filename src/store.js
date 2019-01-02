import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//reducers
import { usersReducer } from './reducers/usersReducer.js';
import { blocksReducer } from './reducers/blocksReducer.js';
import rootReducer from './reducers/rootReducer.js';


export default createStore(
  
  rootReducer,
  applyMiddleware(thunk)
 

)

 