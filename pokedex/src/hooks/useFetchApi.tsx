import React from "react";
import { pokemonInterface } from "../interfaces/PokemonInterface";
//import Pagination from "../components/Pagination/Pagination";
export const useFetch = () => {
  const [pokemons, setPokemons] = React.useState<pokemonInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | undefined>();

  React.useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
        );
        const data = await response.json();

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return details;
          })
        );

        // Sort the Pokémon data alphabetically by name
        const sortedPokemonData = pokemonData.sort(
          (a: pokemonInterface, b: pokemonInterface) =>
            a.name.localeCompare(b.name)
        );

        setPokemons(sortedPokemonData);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError(err);
      }
    };

    fetchPokemons();
  }, []);

  return {
    pokemons,
    loading,
    error,
  };
};
