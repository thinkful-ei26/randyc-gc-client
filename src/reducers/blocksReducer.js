import {

  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_ERROR,
  POST_BLOCK_REQUEST,
  POST_BLOCK_SUCCESS,
  POST_BLOCK_ERROR,
  PUT_BLOCK_REQUEST,
  PUT_BLOCK_SUCCESS,
  DELETE_BLOCK_REQUEST,
  DELETE_BLOCK_SUCCESS
 
} from '../actions/actions-blocks-api';

const initialState = {

  blocks: [{

    _id: null,
    userRef: null,
    startDate: null,
    endDate: null
     
  }],
  loading: false,
  error: null
 
}

export function blocksReducer(state=initialState,action) {


  //GET ALL BLOCKS
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

  //POST BLOCK
  if(action.type === POST_BLOCK_REQUEST){

    return Object.assign({}, state, {

      loading : true
 
    })


  }

  if(action.type === POST_BLOCK_SUCCESS){

    console.log('it worked!');

    return Object.assign({}, state, {

      blocks: [...state.blocks,action.data],
      loading : false
 
    })
  
  }

  if(action.type === POST_BLOCK_ERROR){

    return Object.assign({},state,{

      loading: false,
      error: action.error

    })


  }

  //PUT BLOCK by block id
  if(action.type === PUT_BLOCK_REQUEST){

     return Object.assign({}, state, {
 
      loading: true

     })
 

  }

  if(action.type === PUT_BLOCK_SUCCESS){

    console.log('the new block at the PUT_BLOCK_SUCCESS>>> ',action.block);

    const newArr = state.blocks.map((block,index) => { 
      
      if(action.block._id === block._id){

        return action.block;

      }
      else{

        return block;  


      }
 
    });

    console.log('the new array at PUT_BLOCK_SUCCESS>>> ',newArr);

    return Object.assign({}, state, {

      blocks: newArr,
      loading: true
 
    })


  }

  //DELETE BLOCK by block id
  if(action.type === DELETE_BLOCK_REQUEST){

    return Object.assign({}, state, {

      loading : true
 
    })
 
  }


  if(action.type === DELETE_BLOCK_SUCCESS){

    return Object.assign({}, state, {

      
      blocks: state.blocks.filter(block => block._id !== action.blockid),
      loading : true

 
    })
 
  }


  return state;

}
