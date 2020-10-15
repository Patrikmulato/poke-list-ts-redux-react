import { combineReducers, configureStore } from '@reduxjs/toolkit';
import typeReducer from './poke-types/reducer';
import pokemonByTypeReducer from './pokemons/reducer';
import onePokemonReducer from './one-pokemon/reducer';

const rootReducer = combineReducers({
  pokemonTypes: typeReducer,
  pokemonByType: pokemonByTypeReducer,
  onePokemon: onePokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
