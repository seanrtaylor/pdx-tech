import { COMPANIES_URL, GET_COMPANIES  } from '../constants';
import axios from 'axios';

export const ROOT_URL = 'http://127.0.0.1:3000/companies'
export const CREATE_COMPANY = 'CREATE_COMPANY'

let nextTodoId = 1;



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
  const request = axios.post(`${ROOT_URL}`, props);
  return {
    type: CREATE_COMPANY,
    payload: request

  };
}

export function upVoteCompany(company){
  console.log('in upvote', company);
}

export function downVoteCompany(company){
  console.log('in downvote', company);
}
