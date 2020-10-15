import { Reducer } from 'redux';
import { PokemonByTypeState } from '../../type';
import * as actionTypes from './actionTypes';

const initialState: PokemonByTypeState = {
  errors: undefined,
  loading: false,
  pokemonByType: {
    id: null,
    name: '',
    damage_relations: {},
    game_indices: [],
    generation: {},
    move_damage_class: {},
    names: [],
    pokemon: [{ pokemon: { name: '', url: '' } }],
    moves: [],
  },
};

const pokemonByTypeReducer: Reducer<PokemonByTypeState> = (
  state = initialState,
  action
): PokemonByTypeState => {
  switch (action.type) {
    case actionTypes.GET_POKEMON_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_POKEMON_SUCCEED:
      return {
        ...state,
        pokemonByType: action.payload,
        loading: false,
      };
    case actionTypes.GET_POKEMON_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default pokemonByTypeReducer;
