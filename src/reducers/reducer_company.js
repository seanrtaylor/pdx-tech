import { COMPANIES_URL, GET_COMPANIES, CREATE_COMPANY, UPVOTE_COMPANY } from '../actions/index';
import { GET_COMPANIES_SUCCESS, GET_COMPANIES_FAIL } from '../constants';

const INITIAL_STATE = { all: [], company: null};

export default function(state = [], action) {

  console.log(action.type)
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return action.payload.data.map((company) => {
        if (!company.score) {
          company.score = 0;
        }
        return company;
      });
      return [action.payload.data, ...state];


    case GET_COMPANIES_FAIL:
      console.log('fail');
      break;

    case CREATE_COMPANY:
      return [action, ...state];

    case UPVOTE_COMPANY:
      console.log("hi");
        return [state = {}];
  }
  return state;
}
