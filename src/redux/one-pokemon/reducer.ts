import { Reducer } from 'redux';
import { OnePokemonState } from '../../type';
import * as actionTypes from './actionTypes';

const initialState: OnePokemonState = {
  errors: undefined,
  loading: false,
  OnePokemon: {
    id: null,
    name: '',
    base_experience: null,
    height: null,
    is_default: false,
    order: null,
    weight: null,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: '',
    moves: [],
    sprites: { front_default: '' },
    species: {},
    stats: [],
    types: [],
  },
};

const onePokemonReducer: Reducer<OnePokemonState> = (
  state = initialState,
  action
): OnePokemonState => {
  switch (action.type) {
    case actionTypes.GET_ONE_POKEMON_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ONE_POKEMON_SUCCEED:
      return {
        ...state,
        OnePokemon: action.payload,
        loading: false,
      };
    case actionTypes.GET_ONE_POKEMON_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default onePokemonReducer;
