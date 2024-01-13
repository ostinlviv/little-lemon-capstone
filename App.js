import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useReducer } from "react";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import SplashScreen from "./screens/Splash";
import HomeScreen from "./screens/Home";
import Header from "./components/Header";
import { GlobalContext } from "./Context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
    "MarkaziText-Regular": require("./assets/fonts/MarkaziText-Regular.ttf"),
  });
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_VALUES":
          return {
            ...action.values,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            ...action.values,
            isOnboardingCompleted: true,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isOnboardingCompleted: false,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isOnboardingCompleted: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
      avatar: "",
    }
  );
  useEffect(() => {
    const getData = async () => {
      let isOnboardingCompleted = null;
      let firstName = null;
      let lastName = null;
      let email = null;
      let phone = null;
      let orderStatuses = null;
      let passwordChanges = null;
      let specialOffers = null;
      let newsletter = null;
      let avatar = null;
      try {
        isOnboardingCompleted = await AsyncStorage.getItem(
          "isOnboardingCompleted"
        );
        firstName = await AsyncStorage.getItem("firstName");
        lastName = await AsyncStorage.getItem("lastName");
        email = await AsyncStorage.getItem("email");
        phone = await AsyncStorage.getItem("phone");
        orderStatuses = await AsyncStorage.getItem("orderStatuses");
        passwordChanges = await AsyncStorage.getItem("passwordChanges");
        specialOffers = await AsyncStorage.getItem("specialOffers");
        newsletter = await AsyncStorage.getItem("newsletter");
        avatar = await AsyncStorage.getItem("avatar");
      } catch (e) {
        console.error(e);
      }
      dispatch({
        type: "RESTORE_VALUES",
        values: {
          isOnboardingCompleted: JSON.parse(isOnboardingCompleted),
          firstName: JSON.parse(firstName) || "",
          lastName: JSON.parse(lastName) || "",
          email: JSON.parse(email) || "",
          phone: JSON.parse(phone) || "",
          orderStatuses: JSON.parse(orderStatuses) || false,
          passwordChanges: JSON.parse(passwordChanges) || false,
          specialOffers: JSON.parse(specialOffers) || false,
          newsletter: JSON.parse(newsletter) || false,
          avatar: JSON.parse(avatar),
        },
      });
    };
    getData();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (values) => {
        dispatch({ type: "SIGN_IN", values });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      isOnboardingCompleted: state.isOnboardingCompleted,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      orderStatuses: state.orderStatuses,
      passwordChanges: state.passwordChanges,
      specialOffers: state.specialOffers,
      newsletter: state.newsletter,
      avatar: state.avatar,
    }),
    [state]
  );

  if (state.isLoading || !fontsLoaded) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <GlobalContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  header: ({ navigation }) => (
                    <Header navigation={navigation} />
                  ),
                }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  header: ({ navigation }) => (
                    <Header navigation={navigation} />
                  ),
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </GlobalContext.Provider>
    </NavigationContainer>
  );
}
