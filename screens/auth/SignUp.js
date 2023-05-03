import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { async } from "@firebase/util";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordHide1, setPasswordHide1] = useState(true);
  const [passwordHide2, setPasswordHide2] = useState(true);
  // this functions run everytym username or password or email is changed and it checks if email or password or username have any errors
  useEffect(() => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (password == "") {
      setPasswordError(true);
      // setEmailError(false);
    } else {
      setPasswordError(false);
    }
    if (password.length < 8) {
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(false);
    }
    if (password === confirmPassword) {
      // setEmailError(false);
      // setPasswordError(false);
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  }, [email, password, confirmPassword, username]);
  const handleSignIn = () => {
    // setEmailError(false);
    // setUsernameError(false);
    // setPasswordError(false);
    // setPasswordLengthError(false);
    // setConfirmPasswordError(false);

    if (
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !passwordLengthError &&
      !usernameError
    ) {
      // console.log("login");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          updateProfile(auth.currentUser, {
            displayName: username,
            // photoURL: selectedImage,
          }).then(() => {
            const user = userCredential.user;
            console.log(user);
            Toast.show("signup successful", Toast.SHORT);
            setEmailError(false);
            setPasswordError(false);
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setPasswordLengthError(false);
            setConfirmPasswordError(false);
            // navigation.navigate("TabNavigator");
          });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorCode === "auth/email-already-in-use") {
            Toast.show(
              "user with this email is already exist, Please try Login!",
              Toast.SHORT
            );
          } else {
            Toast.show(
              "something went wrong. Please try again later",
              Toast.SHORT
            );
          }
        });
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
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
        SIGNUP
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
        <ScrollView>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {/*--------------------
            username container
            -----------------------
             */}
            <View style={styles.container}>
              <Text style={styles.input_heading}>Username</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                // placeholder="xyz@gmail.com"
                // keyboardType="email-address"
                style={styles.input_text}
              />
              {usernameError ? (
                <Text style={styles.error}>Please Enter Username</Text>
              ) : (
                <></>
              )}
            </View>
            {/*--------------------
            Email container
            -----------------------
             */}
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
                <Text style={styles.error}>Please Enter email-Id</Text>
              ) : (
                <></>
              )}
            </View>
            {/*--------------------
            password container
            -----------------------
             */}
            <View style={styles.container}>
              <Text style={styles.input_heading}>Password</Text>
              <View
                style={[
                  styles.input_text,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <TextInput
                  value={password}
                  style={{ width: "85%", marginRight: 10 }}
                  secureTextEntry={passwordHide1}
                  onChangeText={(e) => setPassword(e)}
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setPasswordHide1(!passwordHide1)}
                >
                  {!passwordHide1 ? (
                    <Entypo name="eye" size={24} color="black" />
                  ) : (
                    <Entypo name="eye-with-line" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.error}>Please Enter password</Text>
              ) : passwordLengthError ? (
                <Text style={styles.error}>Password is too short</Text>
              ) : (
                <></>
              )}
            </View>
            {/*--------------------
            confirm container
            -----------------------
             */}
            <View style={styles.container}>
              <Text style={styles.input_heading}> Confirm Password</Text>
              <View
                style={[
                  styles.input_text,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <TextInput
                  value={confirmPassword}
                  style={{ width: "85%", marginRight: 10 }}
                  secureTextEntry={passwordHide2}
                  onChangeText={(e) => setConfirmPassword(e)}
                  keyboardType="default"
                />
                <TouchableOpacity
                  onPress={() => setPasswordHide2(!passwordHide2)}
                >
                  {!passwordHide2 ? (
                    <Entypo name="eye" size={24} color="black" />
                  ) : (
                    <Entypo name="eye-with-line" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text style={styles.error}>Password does not match</Text>
              ) : (
                <></>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ width: "70%" }}
              onPress={() => handleSignIn()}
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
                }}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, fontSize: 16, color: "white" }}>
              Already have account?&nbsp;&nbsp;
              <Text
                style={{ fontWeight: "900" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                LOGIN
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;

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
