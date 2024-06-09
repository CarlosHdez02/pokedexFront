import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { pokemonInterface } from "../../interfaces/PokemonInterface";
import styles from './PokemonStyles'

interface PokemonPDFProps {
  pokemon: pokemonInterface;
}

const PokemonPDF: React.FC<PokemonPDFProps> = ({ pokemon }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{pokemon.name}</Text>
        <View style={styles.section}>
          <Image style={styles.image} src={pokemon.sprites.front_default} />
          <View style={styles.skills}>
            <Text>Skills:</Text>
            {pokemon.abilities.map((ability) => (
              <Text key={ability.ability.name} style={styles.skill}>
                - {ability.ability.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.pageNumber}>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default PokemonPDF;
