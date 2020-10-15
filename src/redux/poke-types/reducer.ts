import { Reducer } from 'redux';
import { PokeTypeState } from '../../type';
import * as actionTypes from './actionTypes';

const initialState: PokeTypeState = {
  errors: undefined,
  loading: false,
  types: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
};

const typeReducer: Reducer<PokeTypeState> = (
  state = initialState,
  action
): PokeTypeState => {
  switch (action.type) {
    case actionTypes.GET_TYPES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_TYPES_SUCCEED:
      return {
        ...state,
        types: action.payload,
        loading: false,
      };
    case actionTypes.GET_TYPES_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default typeReducer;
