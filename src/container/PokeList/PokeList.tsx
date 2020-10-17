import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getAllPokemonByTypes } from '../../redux/pokemons/actions';

import { Pokemon, PokemonByTypeRequest } from '../../type';
import LoadingIcon from '../../components/LoadingIcon';
import { Table } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import { isCaughtFunc } from '../../utils/isCaughtFunc';

import './PokeList.css';
import PokemonNameRow from '../../components/PokemonNameRow';

interface PokeListInterface {
  type: string;
}
const PokeList: React.FC<PokeListInterface> = ({ type }: PokeListInterface) => {
  const [text, setText] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [isCaughtChecked, setIsCaughtChecked] = useState(false);
  const dispatch = useDispatch();

  const pokemonByType = useSelector<RootState, PokemonByTypeRequest>(
    (state) => state.pokemonByType.pokemonByType
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemonByType.loading
  );
  const error = useSelector<RootState, string | undefined>(
    (state) => state.pokemonByType.errors
  );

  // get all pokemon filtered by their types
  useEffect(() => {
    dispatch(getAllPokemonByTypes(type));
  }, [type, dispatch]);

  // filter pokemon list with search bar text
  useEffect(() => {
    setFilteredPokemon(
      pokemonByType.pokemon.filter((pokemon) =>
        pokemon.pokemon.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [text, pokemonByType]);

  // add value to state from search bar
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  // check if checkbox is checked
  const onClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    setIsCaughtChecked(e.currentTarget.checked);
  };

  if (loading) return <LoadingIcon />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <>
      <SearchBar onChange={onChange} onClick={onClick} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon.map((pokemon) => {
            const isCaught = isCaughtFunc(pokemon.pokemon.name);
            if (!isCaughtChecked) {
              return (
                <PokemonNameRow
                  key={pokemon.pokemon.name}
                  pokemon={pokemon}
                  isCaught={isCaught}
                />
              );
            } else {
              return (
                isCaught && (
                  <PokemonNameRow
                    key={pokemon.pokemon.name}
                    pokemon={pokemon}
                    isCaught={isCaught}
                  />
                )
              );
            }
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PokeList;
