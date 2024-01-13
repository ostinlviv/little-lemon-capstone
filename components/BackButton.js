import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({ navigation, disabled }) => {
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Ionicons name="md-arrow-back" size={21} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#495E57",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#495E57",
  },
  disabled: {
    backgroundColor: "grey",
    borderColor: "grey",
    opacity: 0.5,
  },
});

export default BackButton;
