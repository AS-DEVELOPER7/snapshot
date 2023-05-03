import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useStateContext } from "../context/StateContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Users = ({ data, following }) => {
  const navigation = useNavigation();
  const { setUserId } = useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  const handleFollow = async (data) => {
    following.some((d) => d.id === data.id)
      ? deleteDoc(doc(db, "data", user.uid, "Following", data.id))
      : await setDoc(doc(db, "data", user.uid, "Following", data.id), {
          for_hire: data.for_hire,
          profile_image: {
            medium: data.profile_image.medium,
          },
          id: data.id,
          name: data.name,
          username: data.username,
        });
    console.log(data);
  };
  const handleUserNavigation = (id) => {
    setUserId(id);
    navigation.navigate("UserProfile");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 20,
      }}
    >
      <TouchableNativeFeedback
        onPress={() => handleUserNavigation(data.username)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: data?.profile_image?.medium }}
            resizeMode={"contain"}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              marginRight: 10,
            }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 160,
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  marginRight: 5,
                }}
                numberOfLines={1}
              >
                {data?.name}
              </Text>
              {data?.for_hire ? (
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={20}
                  color="#8c66e1"
                />
              ) : (
                <></>
              )}
            </View>

            <Text style={{ color: "gray", fontWeight: "600", fontSize: 13 }}>
              {data.total_photos} Posts &#x2022; {data.total_collections}&nbsp;
              Collections
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <TouchableOpacity onPress={() => handleFollow(data)}>
        <Text
          style={{
            borderWidth: 2,
            borderColor: "black",
            paddingHorizontal: 10,
            paddingVertical: 5,
            textAlign: "center",
            textAlignVertical: "center",
            borderRadius: 10,
          }}
        >
          {following.some((d) => d.id === data.id) ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
