import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { validateEmail } from "../utils";
import TextInputComponent from "../components/TextInput";
import { GlobalContext } from "../Context";
import { globalStyles } from "../globalStyles";
import Hero from "../components/Hero";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const isEmailValid = validateEmail(email);
  const { signIn } = useContext(GlobalContext);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.body}>
        <Hero />
        <View style={{ padding: 25 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.inputTitle}>Name *</Text>
            <TextInputComponent value={firstName} onChangeText={setFirstName} />
          </View>
          <View>
            <Text style={styles.inputTitle}>Email *</Text>
            <TextInputComponent
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          rounded
          disabled={!isEmailValid}
          onPress={async () => {
            try {
              await AsyncStorage.setItem(
                "isOnboardingCompleted",
                JSON.stringify(true)
              );
              await AsyncStorage.setItem(
                "firstName",
                JSON.stringify(firstName)
              );
              await AsyncStorage.setItem("email", JSON.stringify(email));
              await signIn({ email, firstName });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  footer: {
    height: 80,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Onboarding;
