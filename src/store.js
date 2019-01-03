import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//reducers
import rootReducer from './reducers/rootReducer.js';


export default createStore(
  
  rootReducer,
  applyMiddleware(thunk)
 

)

 