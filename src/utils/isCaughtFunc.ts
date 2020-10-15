export const isCaughtFunc = (pokemonName: string) => {
  const caughtPokemon = localStorage.getItem('caughtPokemon');

  if (caughtPokemon === null) return false;
  if (caughtPokemon.includes('[')) {
    if (JSON.parse(caughtPokemon).indexOf(pokemonName) > -1) return true;
    else return false;
  } else {
    if (caughtPokemon === pokemonName) return true;
    else return false;
  }
};
