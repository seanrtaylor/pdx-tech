import { COMPANIES_URL, GET_COMPANIES  } from '../constants';
import axios from 'axios';

export const ROOT_URL = 'localhost:3000'
export const CREATE_COMPANY = 'CREATE_COMPANY'

export function getCompanies(){
  return {
    type: GET_COMPANIES,
    payload: {
      request: {
        url: COMPANIES_URL
      }
    }
  };
}

export function createCompany(props){
  const request = axios.post(`${ROOT_URL}${COMPANIES_URL}`, props);

  return {
    type: CREATE_COMPANY,
    payload: request
  };
}
