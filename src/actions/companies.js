import { COMPANIES_URL, GET_COMPANIES, CREATE_COMPANY, UPVOTE_COMPANY  } from '../constants';
import axios from 'axios';

export const ROOT_URL = 'http://127.0.0.1:3000/companies'

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
  //const request = axios.put(`${ROOT_URL}/${company.id}`, company);
  return {
    type: UPVOTE_COMPANY
  };
}


export function downVoteCompany(company){
  console.log('in downvote', company);
}
