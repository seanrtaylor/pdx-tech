import { GET_COMPANIES_SUCCESS, UPVOTE_COMPANY_SUCCESS, UPVOTE_COMPANY_FAIL, GET_COMPANIES_FAIL, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAIL, UPVOTE_COMPANY, GET_COMPANY_SUCCESS, GET_COMPANY_FAIL, UPDATE_COMPANY_SUCCESS  } from '../constants';

const INITIAL_STATE = { all: [], company: null};

export default function(state = [], action) {
  switch (action.type) {

    //get all companies
    case GET_COMPANIES_SUCCESS:
      return action.payload.data.map((company) => {
        if (!company.score) {
          company.score = 0;
        }
        return company;
      });
      return [action.payload.data, ...state];

    //all companies fail
    case GET_COMPANIES_FAIL:
      console.log('fail');
      break;

    //create company success
    case CREATE_COMPANY_SUCCESS:
      console.log(action.payload);
      return [action.payload.data, ...state];

    //create company success
    case CREATE_COMPANY_FAIL:
      console.log('fail');
      break;

    //upvote fail
    case UPVOTE_COMPANY_FAIL:
      console.error('fail', action.error);
      return state;

    //update success
    case UPDATE_COMPANY_SUCCESS:
      let updated = action.meta.previousAction.payload.updatedCompany;

      return state.map( company => {
         if (company.id === updated.id) {
           return Object.assign({}, company, updated );
         }
        return company
      });

    //upvote success
    case UPVOTE_COMPANY_SUCCESS:
      const score = action.payload.data.score;
      let updatedCompany = action.meta.previousAction.payload.updatedCompany;
      return state.map( company => {
         if (company.id === updatedCompany.id) {

           return Object.assign({}, company, { score: score });
         }
        return company
      });

    default:
      console.log('default', action.type);
  }
  return state;
}
