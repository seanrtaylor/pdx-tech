import { COMPANIES_URL, GET_COMPANIES, GET_COMPANY, CREATE_COMPANY, UPVOTE_COMPANY, UPDATE_COMPANY  } from '../constants';
import axios from 'axios';

export const ROOT_URL = 'http://127.0.0.1:3000/companies/'

let nextTodoId = 1;

//get all companies
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

//increase or decrease a companies score
export function voteCompany(updatedCompany, direction){
  return {
    type: UPVOTE_COMPANY,
    payload: {
      request: {
        method: 'POST',
        url: `${ROOT_URL}${updatedCompany.id}/votes/${direction}`
      },
      updatedCompany
    }
  };
}


//make a new company
export function createCompany(newCompany){
  console.log('new company is', newCompany)
  return {
    type: CREATE_COMPANY,
    payload: {
      request: {
        method: 'POST',
        url: COMPANIES_URL,
        data: newCompany
      },
    }
  };
}

//edit a company
export function editCompany(updatedCompany){
  console.log('in edit company action for', updatedCompany);
  return {
    type: UPDATE_COMPANY,
    payload: {
      request: {
        method: 'PUT',
        url: `${ROOT_URL}${updatedCompany.id}`
      },
      updatedCompany
    }
  };
}
