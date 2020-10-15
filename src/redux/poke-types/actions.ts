import * as actionTypes from './actionTypes';
import axios from 'axios';
import { DispatchPokeType } from '../../type';

let baseUrl = 'https://pokeapi.co/api/v2';

export function getAllPokeTypes() {
  return async (dispatch: DispatchPokeType) => {
    dispatch({
      type: actionTypes.GET_TYPES_START,
      payload: { count: 0, next: null, previous: null, results: [] },
    });
    try {
      const response = await axios.get(`${baseUrl}/type`);
      dispatch({
        type: actionTypes.GET_TYPES_SUCCEED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_TYPES_FAIL,
        payload: error.response.statusText,
      });
    }
  };
}
