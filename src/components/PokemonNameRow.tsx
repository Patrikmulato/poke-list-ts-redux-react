import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../type';

interface PokemonNameRowInterface {
  pokemon: Pokemon;
  isCaught: boolean;
}
const PokemonNameRow: React.FC<PokemonNameRowInterface> = ({
  pokemon,
  isCaught,
}: PokemonNameRowInterface) => {
  return (
    <tr>
      <td className={isCaught ? 'caught' : ''}>
        <Link to={`/pokemon/${pokemon.pokemon.name}`}>
          {pokemon.pokemon.name}{' '}
        </Link>
        {isCaught && <small>Caught</small>}
      </td>
    </tr>
  );
};

export default PokemonNameRow;
