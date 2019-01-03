import {

  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_ERROR,
  POST_BLOCK_REQUEST,
  POST_BLOCK_SUCCESS,
  POST_BLOCK_ERROR,
 
} from '../actions/actions-blocks-api';

const initialState = {

  blocks: [{

    _id: 'test 1 block id',
    userRef: 'test 1 user id',
    startDate: 'test 1 block start',
    endDate: 'test 1 block end'
     
  }],
  loading: false,
  error: null
 
}

export function blocksReducer(state=initialState,action) {

  if(action.type === FETCH_BLOCKS_REQUEST){

      return Object.assign({}, state, {

        loading : true
 
      })
 
  }



  if(action.type === FETCH_BLOCKS_SUCCESS){


    

    return Object.assign({}, state, {

      blocks: [...state.blocks,...action.data],
      loading : false


    })


  }


  if(action.type === FETCH_BLOCKS_ERROR){

    return Object.assign({}, state, {

      loading: false,
      error: action.error

    })


  }

  return state;

}
