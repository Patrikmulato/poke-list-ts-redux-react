import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllPokemonByTypes } from '../redux/pokemons/actions';

import { Pokemon, PokemonByTypeRequest } from '../type';
import LoadingIcon from './LoadingIcon';
import { Table } from 'react-bootstrap';
import Search from './Search';
import { isCaughtFunc } from '../utils/isCaughtFunc';

import './PokeList.css';
import PokemonNameRow from './PokemonNameRow';

interface PokeListInterface {
  type: string;
}
const PokeList: React.FC<PokeListInterface> = ({ type }: PokeListInterface) => {
  const [text, setText] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [isCaughtChecked, setIsCaughtChecked] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    setIsCaughtChecked(e.currentTarget.checked);
  };

  const pokemonByType = useSelector<RootState, PokemonByTypeRequest>(
    (state) => state.pokemonByType.pokemonByType
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemonByType.loading
  );
  useEffect(() => {
    dispatch(getAllPokemonByTypes(type));
  }, [type, dispatch]);
  useEffect(() => {
    setFilteredPokemon(
      pokemonByType.pokemon.filter((pokemon) =>
        pokemon.pokemon.name.includes(text)
      )
    );
  }, [text, pokemonByType]);

  if (loading) return <LoadingIcon />;
  return (
    <>
      <Search onChange={onChange} onClick={onClick} />

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
