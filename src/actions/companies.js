import { COMPANIES_URL, GET_COMPANIES  } from '../constants';

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

