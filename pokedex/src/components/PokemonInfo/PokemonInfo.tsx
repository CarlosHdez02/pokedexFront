import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetchApi";
import { pokemonInterface } from "../../interfaces/PokemonInterface";
import classes from "./PokemonInfo.module.css";
import Loader from "../../UI/Loader/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PokemonPDF from "../PDF/PokemonPdf";

const PokemonInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { pokemons, loading, error } = useFetch();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return `Error: ${error}`;
  }

  // Find pokemon by id
  const pokemon = pokemons.find((p: pokemonInterface) => p.id === Number(id));

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  return (
    <div className={classes.pokemonContainer}>
      <div className={classes.pokemonName}>{pokemon.name}</div>
      <div className={classes.pokemonImage}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className={classes.pokemonSkills}>
        <h3>Skills</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <PDFDownloadLink
        document={<PokemonPDF pokemon={pokemon} />}
        fileName={`${pokemon.name}.pdf`}
      >
        {({ loading }) =>
          loading ? <button>Loading PDF...</button> : <button className={classes.downloadButton}>Download PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PokemonInfo;
