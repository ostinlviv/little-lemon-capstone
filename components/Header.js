import { useContext } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Avatar from "./Avatar";
import BackButton from "./BackButton";
import { GlobalContext } from "../Context";

const Header = ({ navigation }) => {
  const { isOnboardingCompleted, avatar } = useContext(GlobalContext);
  return (
    <View style={styles.header}>
      {isOnboardingCompleted && (
        <BackButton
          navigation={navigation}
          disabled={!navigation.canGoBack()}
        />
      )}
      <Pressable
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => {
          isOnboardingCompleted && navigation.navigate("Home");
        }}
      >
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </Pressable>
      {isOnboardingCompleted && (
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Avatar image={avatar} header />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    backgroundColor: "#EDEFEE",
  },
  logo: {
    resizeMode: "contain",
  },
});

export default Header;
