import { Image, StyleSheet, Text, View } from "react-native";

const Hero = () => {
  return (
    <View style={{ backgroundColor: "#495E57", padding: 25 }}>
      <Text style={styles.title}>Little lemon</Text>
      <View style={styles.wrapper}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.text}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../assets/hero_image.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 64,
    color: "#F4CE14",
    height: 55,
    marginTop: -15,
  },
  subtitle: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 40,
    color: "white",
  },
  text: {
    fontFamily: "Karla-Regular",
    fontSize: 16,
    color: "white",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 16,
    marginTop: 10,
  },
});

export default Hero;
