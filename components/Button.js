import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({
  onPress,
  children,
  disabled,
  rounded,
  outlined,
  warning,
}) => {
  const styles = getStyles(rounded, outlined, warning);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const getStyles = (rounded, outlined, warning) =>
  StyleSheet.create({
    buttonWrapper: {
      backgroundColor: outlined ? "white" : warning ? "#F4CE14" : "#495E57",
      borderRadius: rounded ? 8 : 0,
      flexDirection: "row",
      justifyContent: "center",
      padding: 8,
      borderWidth: 1,
      borderColor: warning ? "#F4CE14" : "#495E57",
    },
    disabled: {
      backgroundColor: "grey",
      opacity: 0.5,
    },
    text: {
      fontSize: 16,
      color: outlined || warning ? "#495E57" : "white",
    },
  });

export default Button;
