import { StyleSheet, Text } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default Title;
