import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

//reducers
import rootReducer from './reducers/rootReducer.js';

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
 