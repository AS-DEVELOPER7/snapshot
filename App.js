import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { onAuthStateChanged } from "firebase/auth";
import StateContext from "./context/StateContext";
import SignIn from "./screens/auth/SignIn";
import ForgotPassword from "./screens/auth/ForgotPassword";
import SignUp from "./screens/auth/SignUp";
import TabNavigation from "./screens/router/TabNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  const Stack = createNativeStackNavigator();
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setSignIn(true);
      } else {
        // User is signed out
        // ...
        setSignIn(false);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    console.log(signIn);
  }, [signIn]);
  return (
    <Provider store={store}>
      <StateContext>
        <SafeAreaView style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                backgroundColor: "white",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <View style={{ alignItems: "center", marginBottom: 50 }}>
                <Image
                  resizeMode="contain"
                  source={require("./assets/logo.png")}
                  style={{ height: 150, width: 150 }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 25,
                    letterSpacing: 10,
                    marginTop: 10,
                  }}
                >
                  Snapshot
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "800", fontSize: 15 }}>
                  Powered by
                </Text>
                <Image
                  resizeMode="contain"
                  source={require("./assets/AS-logo.png")}
                  style={{ height: 30, width: 30 }}
                />
                <Text style={{ fontWeight: "800", fontSize: 15 }}>
                  AS Developer
                </Text>
              </View>
            </View>
          ) : (
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="SignIn"
                screenOptions={{
                  headerShown: false,
                }}
              >
                {signIn ? (
                  <Stack.Screen name="TabNavigator" component={TabNavigation} />
                ) : (
                  <>
                    {/* <Stack.Screen name="Loader" component={Loader} /> */}
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen name="SignUp" component={SignUp} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </StateContext>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
