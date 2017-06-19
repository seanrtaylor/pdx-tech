import { COMPANIES_URL, GET_COMPANIES } from '../actions/index';

const INITIAL_STATE = { all: [], company: null};

export default function(state = [], action) {

  switch (action.type) {
    case GET_COMPANIES:
      console.log(action.type)
      return [ all: action.payload.data, ...state ];
  }
  return state;
}
