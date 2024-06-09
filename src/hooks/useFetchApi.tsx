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
        const url = new URL("https://pokedexback.onrender.com/api/pokemons");
        const urlParams = new URLSearchParams(window.location.search);
        const limit = urlParams.get("limit");
        const page = urlParams.get("page");
        if (limit) {
          url.searchParams.append("limit", limit);
        }

        if (page) {
          url.searchParams.append("page", page);
        }

        const response = await fetch(url);
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
