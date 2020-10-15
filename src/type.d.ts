// PokeType
export interface PokeTypeRequest {
  count: number;
  next: number | null;
  previous: number | null;
  results: PokeType[];
}

export interface PokeType {
  name: string;
  url: string;
}

type PokeTypeState = {
  types: PokeTypeRequest;
  loading: boolean;
  errors?: string;
};
type PokeTypeAction = {
  type: string;
  payload: PokeTypeRequest;
};

type DispatchPokeType = (args: PokeTypeAction) => PokeTypeAction;

// PokemonByType
export interface PokemonByTypeRequest {
  id: number | null;
  name: string;
  damage_relations: {};
  game_indices: [];
  generation: {};
  move_damage_class: {};
  names: [];
  pokemon: Pokemon[];
  moves: [];
}

export interface Pokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

type PokemonByTypeState = {
  pokemonByType: PokemonByTypeRequest;
  loading: boolean;
  errors?: string;
};
type PokemonByTypeAction = {
  type: string;
  payload: PokemonByTypeRequest;
};

type DispatchPokemonByType = (args: PokemonByTypeAction) => PokemonByTypeAction;

// OnePokemon
export interface OnePokemonRequest {
  id: number | null;
  name: string;
  base_experience: number | null;
  height: number | null;
  is_default: boolean;
  order: number | null;
  weight: number | null;
  abilities: Abilities[];
  forms: [];
  game_indices: [];
  held_items: [];
  location_area_encounters: string;
  moves: [];
  sprites: Sprites;
  species: {};
  stats: [];
  types: [];
}

export interface Abilities {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}
type Sprites = {
  front_default: string;
};

type OnePokemonState = {
  OnePokemon: OnePokemonRequest;
  loading: boolean;
  errors?: string;
};
type OnePokemonAction = {
  type: string;
  payload: OnePokemonRequest;
};

type DispatchOnePokemon = (args: OnePokemonAction) => OnePokemonAction;
