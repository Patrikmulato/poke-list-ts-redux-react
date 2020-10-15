import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllPokemonByTypes } from '../redux/pokemons/actions';

import { PokemonByTypeRequest, PokemonByTypeState } from '../type';
import LoadingIcon from './LoadingIcon';
import { Table } from 'react-bootstrap';
import Search from './Search';
import { Link } from 'react-router-dom';

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

  /* React.useEffect(() => {
    const text = localStorage.getItem('text');
    console.log(text);
    text && setText(text);
  }, [setText]);

  useEffect(() => {
    localStorage.setItem('text', text);
  }, [text]); */

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
          {filteredPokemon.map((pokemon) => (
            <tr key={pokemon.pokemon.name}>
              <td>
                <Link to={`/pokemon/${pokemon.pokemon.name}`}>
                  {pokemon.pokemon.name}{' '}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PokeList;
