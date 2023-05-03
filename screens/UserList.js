import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { db } from "../../firebaseConfig";
import AccountUser from "../components/account/AccountUser";
import { TouchableOpacity } from "react-native";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
const UserList = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setFollowing(data.docs);
    });
  }, []);
  console.log(following);
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
            {/* {userId} */} Following
          </Text>
        </View>

        <View style={{ height: "90%", width: "100%" }}>
          {following?.length > 0 ? (
            <FlatList
              style={{
                height: "100%",
                width: "100%",
              }}
              data={following}
              renderItem={(item) => (
                <AccountUser data={item.item} following={following} />
              )}
              // renderItem={(item) => <Text>{item.item.id}</Text>}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <Text
                style={{ fontWeight: "800", fontSize: 17, letterSpacing: 2 }}
              >
                Users not found
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({});
