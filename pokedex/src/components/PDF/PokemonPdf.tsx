import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { pokemonInterface } from "../../interfaces/PokemonInterface";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  skills: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  skill: {
    marginBottom: 10,
    fontSize: 14,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

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
