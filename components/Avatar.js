import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../Context";

const Avatar = ({ image, header }) => {
  const styles = getStyles(header);
  const { firstName, lastName } = useContext(GlobalContext);
  const text =
    (firstName && firstName.charAt(0).toUpperCase()) +
      (lastName && lastName.charAt(0).toUpperCase()) || "A";
  return image ? (
    <Image source={{ uri: image }} style={styles.rounded} />
  ) : (
    <View style={styles.rounded}>
      <Text style={{ color: "white", fontSize: 20 }}>{text}</Text>
    </View>
  );
};

const getStyles = (header) =>
  StyleSheet.create({
    rounded: {
      width: header ? 40 : 60,
      height: header ? 40 : 60,
      borderRadius: header ? 40 : 60,
      backgroundColor: "#495E57",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Avatar;
