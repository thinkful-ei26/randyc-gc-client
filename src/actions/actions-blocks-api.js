import { API_BASE_URL } from '../config';

//async actions to work with blocks API
export const SELECT_BLOCK = 'SELECT_BLOCK';
export const selectBlock = blockId => {

  return{ 
    
    type: 'SELECT_BLOCK',
    blockId
  
  };

}

//GET all blocks from the current authorized User
export const FETCH_BLOCKS_REQUEST = 'FETCH_BLOCKS_REQUEST';
export const fetchBlocksRequest = () => {
  
  return(dispatch,getState) => {

    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/api/users/blocks/`,{

        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }


    })
      .then((response)=>{

        return response.json();
 
      })
      .then(data => dispatch(fetchBlocksSuccess(data)))
      .catch(error => console.log(error))
 
  }



}

export const FETCH_BLOCKS_SUCCESS = 'FETCH_BLOCKS_SUCCESS';
export const fetchBlocksSuccess = (data) => {

  return {

    type: 'FETCH_BLOCKS_SUCCESS',
    data
 
  }
 
}

export const FETCH_BLOCKS_ERROR = 'FETCH_BLOCKS_ERROR';
export const fetchBlocksError = (error) => {

  return {

    type: 'FETCH_BLOCKS_ERROR',
    error
 
  }
 
}



//POST a block ******
export const POST_BLOCK_REQUEST = 'POST_BLOCK_REQUEST';
export const postBlockRequest = (obj) => (dispatch,getState) => {
 
  // obj.userRef = getState().usersReducer.userId;

  obj.userRef = getState().auth.currentUser.id;//set user id on a block as userRef

const authToken = getState().auth.authToken;
return fetch(`${API_BASE_URL}/api/users/blocks/post`, {

    method: 'POST',
    body: JSON.stringify(obj),
    headers: {

      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'

    }
 
  })
  .then(res => res.json())
  .then(data => dispatch(postBlockSuccess(data)))
  .catch(error => console.log(error))
   
}//
  
export const POST_BLOCK_SUCCESS = 'POST_BLOCK_SUCCESS';
export const postBlockSuccess = (data) => {
 
  return {

    type: 'POST_BLOCK_SUCCESS',
    data


  }
 
}
 
export const POST_BLOCK_ERROR = 'POST_BLOCK_ERROR';
export const postBlockError = (error) => {

  return {

    type: 'POST_BLOCK_ERROR',
    error
 
  }
 
}

//PUT --> EDIT AN EXISTING BLOCK
export const PUT_BLOCK_REQUEST = 'PUT_BLOCK_REQUEST';
export const putBlockRequest = (block) => (dispatch,getState) => {
 
  //console.log('put block request!', getState().usersReducer.userId);
  block.userRef = getState().usersReducer.userId;

  //console.log('the put object!', block);
  
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/users/blocks/put/${block._id}`, {

    method: 'PUT',
    body: JSON.stringify(block),
    headers: {

      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'

    }
 
  })
  .then(res => res.json())
  .then(() => dispatch(putBlockSuccess(block)))
  .catch(error => console.log(error))


}

export const PUT_BLOCK_SUCCESS = 'PUT_BLOCK_SUCCESS';
export const putBlockSuccess = (block) => {
  
  //console.log('put block!>>> ', block);

  return {

    type: 'PUT_BLOCK_SUCCESS',
    block

  }

}


//DELETE a block 
export const DELETE_BLOCK_REQUEST = 'DELETE_BLOCK_REQUEST';
export const deleteBlockRequest = (blockid) => (dispatch, getState) => {

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/blocks/delete/${blockid}`, {

    method: 'DELETE',
    headers: {

       // Provide our auth token as credentials
       Authorization: `Bearer ${authToken}`,
      'content-type' : 'application/json'

    }
     
  })
  .then(() => dispatch(deleteBlockSuccess(blockid)))
  .catch(error => console.log(error))


}//

export const DELETE_BLOCK_SUCCESS = 'DELETE_BLOCK_SUCCESS';
export const deleteBlockSuccess = (blockid) => {

  console.log('delete success');

  return {

    type: 'DELETE_BLOCK_SUCCESS',
    blockid

  }


}


