import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../../context/StateContext";
import { db, storage } from "../../firebaseConfig";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { Alert } from "react-native";
// import { useStateContext } from "../context/StateContext";

const AccountSinglepost = ({ data }) => {
  const navigation = useNavigation();
  const { setUserId } = useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log(favorite);
  const [url, setUrl] = useState("");
  useEffect(() => {
    getDownloadURL(ref(storage, data.fullPath)).then((data) => {
      setUrl(data);
      // console.log(data);
    });
  }, []);
  const handleDelete = () => {
    Alert.alert("Hold on!", "Are you sure you want to delete your post?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () =>
          deleteObject(ref(storage, data.fullPath))
            .then(() => {
              // File deleted successfully
              navigation.navigate("Account");
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
            }),
      },
    ]);
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        marginBottom: 30,
        borderRadius: 25,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableNativeFeedback>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={
                user.photoURL
                  ? {
                      uri: user.photoURL,
                    }
                  : require("../../assets/profile-placeholder.png")
              }
              resizeMode={"contain"}
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                marginRight: 10,
              }}
            />

            <Text
              style={{
                fontWeight: "800",
                marginRight: 5,
              }}
              numberOfLines={1}
            >
              {user.displayName}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => handleDelete()}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </TouchableNativeFeedback>
      </View>

      <Image
        source={{ uri: url }}
        resizeMode={"contain"}
        style={{
          width: "100%",
          height: 450,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableNativeFeedback>
            <AntDesign
              name="hearto"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <Ionicons name="bookmark-outline" size={24} color="black" />
          </TouchableNativeFeedback>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(url).catch((err) =>
              console.error("Error downloading image: ", err)
            )
          }
        >
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "800", marginLeft: 10, marginBottom: 10 }}>
        0 &nbsp; likes
      </Text>
      <View
        style={{
          marginBottom: 20,
          width: "95%",
          marginLeft: 10,
        }}
      >
        <Text style={{ fontWeight: "800", fontSize: 12 }}>
          {user.displayName}
          &nbsp;&nbsp;&nbsp;
          <Text style={{ fontWeight: "500", fontSize: 15, marginLeft: 50 }}>
            {data.name}
          </Text>
        </Text>
      </View>
    </View>
  );
};
export default AccountSinglepost;

const styles = StyleSheet.create({});
