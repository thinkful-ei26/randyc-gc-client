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
  DELETE_BLOCK_SUCCESS,
  SELECT_BLOCK
 
} from '../actions/actions-blocks-api';

const initialState = {
 
  blocks: [],
  loading: false,
  error: null,
  selectedBlock: null
 
}

export function blocksReducer(state=initialState,action) {

  
  //SELECTED BLOCK FROM CALENDAR 
  if(action.type === SELECT_BLOCK){

    return Object.assign({}, state, {

      selectedBlock : action.blockId

    })

  }





  //GET ALL BLOCKS
  if(action.type === FETCH_BLOCKS_REQUEST){

      return Object.assign({}, state, {

        loading : true
 
      })
 
  }

  if(action.type === FETCH_BLOCKS_SUCCESS){
   
    //ref blocks: [...state.blocks,...action.data],

    return Object.assign({}, state, {

      blocks: [...action.data],
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

    const newArr = state.blocks.map((block,index) => { 
      
      if(action.block._id === block._id){

        return action.block;

      }
      else{

        return block;  


      }
 
    });

    

    return Object.assign({}, state, {

      blocks: newArr,
      selectedBlock: null,
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
      selectedBlock: null,
      loading : true

 
    })
 
  }


  return state;

}
