import * as actionTypes from './actionTypes';
import axios from 'axios';
import { DispatchPokeType } from '../../type';

let baseUrl = 'https://pokeapi.co/api/v2';

export function getOnePokemon(pokemonName: string) {
  return async (dispatch: DispatchPokeType) => {
    dispatch({
      type: actionTypes.GET_ONE_POKEMON_START,
      payload: { count: 0, next: null, previous: null, results: [] },
    });
    try {
      const response = await axios.get(`${baseUrl}/pokemon/${pokemonName}`);
      dispatch({
        type: actionTypes.GET_ONE_POKEMON_SUCCEED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ONE_POKEMON_FAIL,
        payload: error.response.statusText,
      });
    }
  };
}
