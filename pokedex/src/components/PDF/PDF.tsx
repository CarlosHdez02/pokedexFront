import React from "react";
import image from "../../assets/sai.jpeg";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding:1
  },
  title:{
    fontSize:24,
    textAlign:"center",
    fontWeight:"bold",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  paragraph:{
    fontSize:12,
    textAlign:"justify",
    lineHeight:1.5,
    margin:10
  },
  pageNumber:{
    position:"absolute",
    fontSize:12,
    bottom:30,
    left:0,
    right:0,
    textAlign:"center",
    color:"grey",
  }
});
const PDF = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Here is your Pokemon!</Text>
        <View style={styles.section}>
          <Image src={image} />
        </View>
        <Text style={styles.paragraph}>

        </Text>
        <View style={styles.pageNumber}>
            <Text render={({pageNumber,totalPages})=> `${pageNumber}/${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
