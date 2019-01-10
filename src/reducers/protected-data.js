import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

// const initialState = {
//   data: '',
//   error: null
// };

const initialState = {
 
    blocks: [],
    loading: false,
    error: null,
    selectedBlock: null
   
  }

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      
    console.log('protected data>> ',action.data)
    
    return Object.assign({}, state, {
         
        blocks: [...action.data],
        loading : false
  
      });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
      return Object.assign({}, state, {
          
        loading: false,
        error: action.error

      });
  }
  return state;
}
