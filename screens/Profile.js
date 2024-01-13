import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import ImagePicker from "../components/ImagePicker";
import Title from "../components/Title";
import InputTitle from "../components/InputTitle";
import TextInputComponent, { inputStyles } from "../components/TextInput";
import { GlobalContext } from "../Context";
import { globalStyles } from "../globalStyles";

const Profile = () => {
  const {
    firstName,
    lastName,
    email,
    phone,
    orderStatuses,
    passwordChanges,
    specialOffers,
    newsletter,
    avatar,
    signOut,
  } = useContext(GlobalContext);
  const [firstNameValue, setFirstNameValue] = useState(firstName);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [emailValue, setEmailValue] = useState(email);
  const [phoneValue, setPhoneValue] = useState(phone);
  const [orderStatusesValue, setOrderStatusesValue] = useState(orderStatuses);
  const [passwordChangesValue, setPasswordChangesValue] =
    useState(passwordChanges);
  const [specialOffersValue, setSpecialOffersValue] = useState(specialOffers);
  const [newsletterValue, setNewsletterValue] = useState(newsletter);
  const [image, setImage] = useState(avatar);
  const [isLoading, setLoading] = useState(false);
  return (
    <View style={globalStyles.container}>
      <View style={{ ...globalStyles.body, padding: 16 }}>
        <ScrollView>
          <Title>Personal information</Title>
          <View style={styles.section}>
            <InputTitle>Avatar</InputTitle>
            <ImagePicker image={image} onUpdate={setImage} />
          </View>
          <View style={styles.section}>
            <InputTitle>First name</InputTitle>
            <TextInputComponent
              value={firstNameValue}
              onChangeText={setFirstNameValue}
            />
          </View>
          <View style={styles.section}>
            <InputTitle>Last name</InputTitle>
            <TextInputComponent
              value={lastNameValue}
              onChangeText={setLastNameValue}
            />
          </View>
          <View style={styles.section}>
            <InputTitle>Email</InputTitle>
            <TextInputComponent
              value={emailValue}
              onChangeText={setEmailValue}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.section}>
            <InputTitle>Phone number</InputTitle>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <MaskedTextInput
                mask="(999) 999-9999"
                placeholder="(123) 456-7890"
                keyboardType="decimal-pad"
                value={phoneValue}
                onChangeText={(text, rawText) => {
                  setPhoneValue(rawText);
                }}
                style={inputStyles.input}
              />
            </KeyboardAvoidingView>
          </View>
          <Title>Email notifications</Title>
          <View style={styles.section}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={orderStatusesValue}
                onValueChange={setOrderStatusesValue}
              />
              <Text>Order statuses</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={passwordChangesValue}
                onValueChange={setPasswordChangesValue}
              />
              <Text>Password changes</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={specialOffersValue}
                onValueChange={setSpecialOffersValue}
              />
              <Text>Special offers</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={newsletterValue}
                onValueChange={setNewsletterValue}
              />
              <Text>Newsletter</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Button
              rounded
              warning
              onPress={async () => {
                signOut();
                await AsyncStorage.clear();
              }}
            >
              Log out
            </Button>
          </View>
          <View style={styles.saveWrapper}>
            <Button rounded outlined>
              Discard changes
            </Button>
            <Button
              rounded
              onPress={async () => {
                setLoading(true);
                await AsyncStorage.setItem(
                  "firstName",
                  JSON.stringify(firstNameValue)
                );
                await AsyncStorage.setItem(
                  "lastName",
                  JSON.stringify(lastNameValue)
                );
                await AsyncStorage.setItem("email", JSON.stringify(emailValue));
                await AsyncStorage.setItem("phone", JSON.stringify(phoneValue));
                await AsyncStorage.setItem(
                  "orderStatuses",
                  JSON.stringify(orderStatusesValue)
                );
                await AsyncStorage.setItem(
                  "passwordChanges",
                  JSON.stringify(passwordChangesValue)
                );
                await AsyncStorage.setItem(
                  "specialOffers",
                  JSON.stringify(specialOffersValue)
                );
                await AsyncStorage.setItem(
                  "newsletter",
                  JSON.stringify(newsletterValue)
                );
                await AsyncStorage.setItem("avatar", JSON.stringify(image));
                setLoading(false);
              }}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  saveWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 16,
    width: "100%",
  },
});

export default Profile;
