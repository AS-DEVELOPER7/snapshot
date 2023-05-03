import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  // const provider = new GoogleAuthProvider();

  const handleEmailPassSignin = () => {
    setEmailError(false);

    if (email === "") {
      setEmailError(true);
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Toast.show("Check your email", Toast.SHORT, Toast.TOP);

          setEmailError(false);

          setEmail("");

          navigation.navigate("SignIn");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.group("error code", errorCode);
          console.group("error message", errorMessage);
          Toast.show("Please check Your email and password", Toast.SHORT);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <StatusBar backgroundColor="white" />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#1a1a1a",
          padding: 10,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50 / 2,
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          color: "black",
          letterSpacing: 25,
          textAlign: "center",
          marginBottom: 55,
        }}
      >
        Fogot Password
      </Text>
      <View
        style={{
          backgroundColor: "#1a1a1a",
          height: "70%",
          width: "100%",
          borderTopStartRadius: 50,
          padding: 20,
        }}
      >
        <ScrollView style={{ height: "100%" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.input_heading}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                // placeholder="xyz@gmail.com"
                keyboardType="email-address"
                style={styles.input_text}
              />
              {emailError ? (
                <Text style={styles.error}>Please Enter email Id</Text>
              ) : (
                <></>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{ width: "70%" }}
              onPress={() => handleEmailPassSignin()}
              // disabled={isDisabled}
            >
              <Text
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  paddingVertical: 15,
                  textAlign: "center",
                  color: "black",
                  fontWeight: "900",
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 20,
                  fontSize: 17,
                  marginTop: 40,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  input_text: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 18,
    width: "100%",
    borderRadius: 25,
    color: "black",
    paddingHorizontal: 10,
  },
  input_heading: {
    fontSize: 18,
    fontWeight: "900",
    color: "white",
    marginBottom: 10,
  },
  container: {
    width: "100%",
    marginBottom: 30,
  },
  error: { color: "white", fontWeight: "600", marginTop: 10 },
});
