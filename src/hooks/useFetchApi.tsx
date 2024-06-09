import React from "react";
import { pokemonInterface } from "../interfaces/PokemonInterface";

export const useFetch = () => {
  const [pokemons, setPokemons] = React.useState<pokemonInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | undefined>();

  React.useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pokedexback.onrender.com/api/pokemons"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pokemons");
        }
        const data = await response.json();
        setPokemons(data);
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
