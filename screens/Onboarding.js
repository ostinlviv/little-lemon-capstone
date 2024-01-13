import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { validateEmail } from "../utils";
import TextInputComponent from "../components/TextInput";
import { GlobalContext } from "../Context";
import { globalStyles } from "../globalStyles";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const isEmailValid = validateEmail(email);
  const { signIn } = useContext(GlobalContext);
  return (
    <View style={globalStyles.container}>
      <View style={{ ...globalStyles.body, padding: 16 }}>
        <Text style={styles.title}>Let us get to know you</Text>
        <View>
          <View>
            <Text style={styles.inputTitle}>First name</Text>
            <TextInputComponent value={firstName} onChangeText={setFirstName} />
          </View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
  },
  footer: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Onboarding;
