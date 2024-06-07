import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDF from "../../components/PDF/PDF";
import classes from './Pokemons.module.css'

const PokemonsPage = () => {
  return (
    <>
      <div className={classes.pokemonActions}>
        <PDFDownloadLink document={<PDF />} fileName="pokemon.pdf">
          {({ loading }) =>
            loading ? (
              <button className={classes.pdfButton}>Loading Doc...</button>
            ) : (
              <button className={classes.pdfButton}>Download now!</button>
            )
          }
        </PDFDownloadLink>
      </div>
      <div className={classes.pdfViewer}>
        <PDFViewer>
          <PDF />
        </PDFViewer>
      </div>
    </>
  );
};

export default PokemonsPage;
