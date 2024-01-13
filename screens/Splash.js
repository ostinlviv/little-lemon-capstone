import { View, Image } from "react-native";

const Splash = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ resizeMode: "contain" }}
        source={require("../assets/logo.png")}
      />
    </View>
  );
};

export default Splash;
