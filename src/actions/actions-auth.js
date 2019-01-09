import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../config';
import {saveAuthToken, clearAuthToken} from '../local-storage';

 export const login = (userName, password) => dispatch => {

  return (

    fetch(`${API_BASE_URL}/login`, {

      method: 'POST',
      headers: {}



    })




  );





 }