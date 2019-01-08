import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';



//reducers
import rootReducer from './reducers/rootReducer.js';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;


export default createStore(
  
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  
 

)

 