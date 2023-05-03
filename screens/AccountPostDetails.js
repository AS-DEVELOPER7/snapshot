import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
// import { usePostDetailQuery } from "../app/services";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import HomePosts from "../components/HomePosts";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ScrollView } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import AccountSinglepost from "../components/account/AccountSinglePost";
// import AccountSinglepost from "../components/account/AccountSinglePost";
const AccountPostDetails = ({ navigation }) => {
  const { accountPost } = useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(accountPost);

  return (
    <>
      <View
        style={{
          height: "100%",
          backgroundColor: "#f5f5f5",
          width: "100%",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: 10,
            // backgroundColor: "black",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              // backgroundColor: "black",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}>
            {/* {userId} */} Post
          </Text>
        </View>

        <View style={{ height: "90%", width: "100%" }}>
          <ScrollView>
            <AccountSinglepost data={accountPost} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default AccountPostDetails;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
