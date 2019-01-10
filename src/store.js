import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//auth
import {loadAuthToken} from './local-storage';
import auth from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import {setAuthToken, refreshAuthToken} from './actions/auth';


//reducers
import rootReducer from './reducers/rootReducer.js';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

 

// export default createStore(
  
//   rootReducer,
//   // composeEnhancers(applyMiddleware(thunk))
   
// )


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {

    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
    
}

export default store;
 