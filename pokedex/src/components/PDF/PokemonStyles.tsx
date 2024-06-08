import { StyleSheet } from "@react-pdf/renderer";

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
  export default styles