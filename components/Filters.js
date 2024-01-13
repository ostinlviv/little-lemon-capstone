import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          textTransform: "uppercase",
          fontWeight: "bold",
          fontFamily: "Karla-Regular",
          marginBottom: 14,
        }}
      >
        Order for Delivery
      </Text>
      <View style={styles.filtersContainer}>
        {sections.map((section, index) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <TouchableOpacity
              onPress={() => {
                onChange(index);
              }}
              style={{
                padding: 10,
                borderRadius: 16,
                backgroundColor: selections[index] ? "#F4CE14" : "#edefee",
              }}
            >
              <View>
                <Text
                  style={{
                    color: selections[index] ? "white" : "black",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: 18,
                    fontFamily: "Karla-Regular",
                  }}
                >
                  {section}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderBottomWidth: 1,
    borderColor: "#EDEFEE",
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Filters;
