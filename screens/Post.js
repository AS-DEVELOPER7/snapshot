import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import Toast from "react-native-simple-toast";
const Post = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const focused = useIsFocused();
  const storageref = ref(storage, `${user.uid} /posts/ ${caption}`);
  let blob;
  let response;
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  useEffect(() => {
    pickImageAsync();
  }, []);
  const blobresponse = async () => {
    blob = await fetch(selectedImage);
    response = await blob.blob();
    await uploadBytes(storageref, response).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      navigation.navigate("Home");
      setSelectedImage(null);
      setCaption("");
    });
    // getMetadata(storageref).then((data) => {
    //   console.log(data);
    // });
  };
  const handlePost = () => {
    console.log(selectedImage);
    selectedImage && caption !== ""
      ? blobresponse()
      : Toast.show("Please Provide Image and caption", Toast.SHORT);
  };
  return (
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
          New Post
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../assets/placeholder-image.webp")
          }
          style={{ height: 250, width: "100%", borderRadius: 15 }}
          resizeMode={"contain"}
        />
        <TouchableOpacity
          onPress={() => pickImageAsync()}
          style={{
            alignItems: "center",
            width: "100%",
            marginTop: 10,
            // backgroundColor: "black",
          }}
        >
          <Text style={{ color: "#8c66e1", fontWeight: "700", fontSize: 15 }}>
            Change Image
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Text style={{ fontWeight: "600" }}>Caption</Text>
        <TextInput
          value={caption}
          onChangeText={(e) => setCaption(e)}
          placeholder="description of image...."
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "black",
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,

          backgroundColor: "black",

          paddingVertical: 12,
          borderRadius: 15,
          width: "70%",
        }}
        // disabled={!selectedImage || caption === ""}
        onPress={() => handlePost()}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "700",
            fontSize: 18,
            color: "white",
            letterSpacing: 2,
          }}
        >
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
