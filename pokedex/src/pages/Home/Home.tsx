import React from "react";
import { useFetch } from "../../hooks/useFetchApi";
import classes from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pokemonsPerPage = 12; // Set a fixed number of Pokémon per page
  const { pokemons, loading, error } = useFetch();

  if (loading) {
    return <div>Loading pokemons...</div>;
  }
  if (error) {
    return `Error: ${error}`;
  }
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <ul className={classes.pokemons}>
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.id} className={classes.pokemon}>
            <Link to="/pokemon">
              <img
                className={classes.imageContainer}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </Link>

            <h2>#{pokemon.id}</h2>
            <h3>{pokemon.name}</h3>
          </li>
        ))}
      </ul>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={pokemons.length}
        paginate={paginate}
      />
    </>
  );
};
export default Home;
