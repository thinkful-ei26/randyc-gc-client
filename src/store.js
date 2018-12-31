import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//reducers
import { daysReducer } from './reducers/daysReducer';


export default createStore(
  
  daysReducer,
  applyMiddleware(thunk)
 

)

 