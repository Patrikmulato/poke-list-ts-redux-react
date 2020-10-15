import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllPokemonByTypes } from '../redux/pokemons/actions';

import { PokemonByTypeRequest } from '../type';
import LoadingIcon from './LoadingIcon';
import { Table } from 'react-bootstrap';
import Search from './Search';
import { Link } from 'react-router-dom';
import { isCaughtFunc } from '../utils/isCaughtFunc';

import './PokeList.css';

interface PokeListInterface {
  type: string;
}
const PokeList: React.FC<PokeListInterface> = ({ type }: PokeListInterface) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const pokemonByType = useSelector<RootState, PokemonByTypeRequest>(
    (state) => state.pokemonByType.pokemonByType
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemonByType.loading
  );
  useEffect(() => {
    dispatch(getAllPokemonByTypes(type));
  }, [type, dispatch]);

  if (loading) return <LoadingIcon />;
  let filteredPokemon = pokemonByType.pokemon.filter((pokemon) =>
    pokemon.pokemon.name.includes(text)
  );

  return (
    <>
      <Search onChange={onChange} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon.map((pokemon) => {
            const isCaught = isCaughtFunc(pokemon.pokemon.name);
            return (
              <tr key={pokemon.pokemon.name}>
                <td className={isCaught ? 'caught' : ''}>
                  <Link to={`/pokemon/${pokemon.pokemon.name}`}>
                    {pokemon.pokemon.name}{' '}
                  </Link>
                  {isCaught && <small>Caught</small>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PokeList;
