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
import React from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../context/StateContext";

const Posts = ({ data, favorite, following, collections }) => {
  const navigation = useNavigation();
  const { setUserId } = useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log(favorite);
  const handleFavorite = async (data) => {
    favorite.some((d) => d.id === data.id.stringValue)
      ? deleteDoc(doc(db, "data", user.uid, "favorites", data.id.stringValue))
      : await setDoc(
          doc(db, "data", user.uid, "favorites", data.id.stringValue),
          {
            id: data.id.stringValue,
            alt_description: data.alt_description.stringValue,
            user: {
              for_hire: data.user.mapValue.fields.for_hire.booleanValue,
              profile_image: {
                medium:
                  data.user.mapValue.fields.profile_image.mapValue.fields.medium
                    .stringValue,
              },
              id: data.user.mapValue.fields.id.stringValue,
              name: data.user.mapValue.fields.name.stringValue,
              username: data.user.mapValue.fields.username.stringValue,
            },
            urls: {
              regular: data.urls.mapValue.fields.regular.stringValue,
            },
            likes: data.likes.integerValue,
            links: {
              download: data.links.mapValue.fields.download.stringValue,
            },
          }
        );
    //   console.log(data);
  };
  const handleCollection = async (data) => {
    collections.some((d) => d.id === data?.id?.stringValue)
      ? deleteDoc(doc(db, "data", user.uid, "collection", data.id.stringValue))
      : await setDoc(
          doc(db, "data", user.uid, "collection", data.id.stringValue),
          {
            id: data.id.stringValue,
            alt_description: data.alt_description.stringValue,
            user: {
              for_hire: data.user.mapValue.fields.for_hire.booleanValue,
              profile_image: {
                medium:
                  data.user.mapValue.fields.profile_image.mapValue.fields.medium
                    .stringValue,
              },
              id: data.user.mapValue.fields.id.stringValue,
              name: data.user.mapValue.fields.name.stringValue,
              username: data.user.mapValue.fields.username.stringValue,
            },
            urls: {
              regular: data.urls.mapValue.fields.regular.stringValue,
            },
            likes: data.likes.integerValue,
            links: {
              download: data.links.mapValue.fields.download.stringValue,
            },
          }
        );
    //   console.log(data);
  };
  const handleFollow = async (data) => {
    following.some((d) => d.id === data.user.id)
      ? deleteDoc(
          doc(
            db,
            "data",
            user.uid,
            "Following",
            data.user.mapValue.fields.id.stringValue
          )
        )
      : await setDoc(
          doc(
            db,
            "data",
            user.uid,
            "Following",
            data.user.mapValue.fields.id.stringValue
          ),
          {
            for_hire: data.user.mapValue.fields.for_hire.booleanValue,
            profile_image: {
              medium:
                data.user.mapValue.fields.profile_image.mapValue.fields.medium
                  .stringValue,
            },
            id: data.user.mapValue.fields.id.stringValue,
            name: data.user.mapValue.fields.name.stringValue,
            username: data.user.mapValue.fields.username.stringValue,
          }
        );
    //   console.log(data);
  };
  const handleUserNavigation = (id) => {
    setUserId(id);
    navigation.navigate("UserProfile");
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
        <TouchableNativeFeedback
          onPress={() =>
            handleUserNavigation(
              data?.user?.mapValue?.fields?.username?.stringValue
            )
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: data?.user?.mapValue?.fields?.profile_image?.mapValue
                  ?.fields?.medium?.stringValue,
              }}
              resizeMode={"contain"}
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                marginRight: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 150,
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  marginRight: 5,
                }}
                numberOfLines={1}
              >
                {data?.user?.mapValue?.fields?.name
                  ? data?.user?.mapValue?.fields?.name?.stringValue
                  : data?.user?.mapValue?.fields?.username?.stringValue}
              </Text>
              {data?.user?.mapValue?.fields?.for_hire?.booleanValue ? (
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={20}
                  color="#8c66e1"
                />
              ) : (
                <></>
              )}
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
            {following.some(
              (d) => d.id === data?.user?.mapValue?.fields?.id?.stringValue
            )
              ? "Following"
              : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: data?.urls?.mapValue?.fields?.regular?.stringValue }}
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
          <TouchableNativeFeedback onPress={() => handleFavorite(data)}>
            {favorite.some((d) => d.id === data?.id?.stringValue) ? (
              <AntDesign
                name="heart"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            ) : (
              <AntDesign
                name="hearto"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => handleCollection(data)}>
            {collections.some((d) => d.id === data?.id?.stringValue) ? (
              <Ionicons name="bookmark" size={24} color="black" />
            ) : (
              <Ionicons name="bookmark-outline" size={24} color="black" />
            )}
          </TouchableNativeFeedback>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              data?.links?.mapValue?.fields?.download?.stringValue
            ).catch((err) => console.error("Error downloading image: ", err))
          }
        >
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "800", marginLeft: 10, marginBottom: 10 }}>
        {favorite.some((d) => d.id === data?.id?.stringValue)
          ? Number(data?.likes?.integerValue) + 1
          : data?.likes?.integerValue}
        &nbsp; likes
      </Text>
      <View
        style={{
          marginBottom: 20,
          width: "95%",
          marginLeft: 10,
        }}
      >
        <Text style={{ fontWeight: "800", fontSize: 12 }}>
          {data?.user?.mapValue?.fields?.name?.stringValue
            ? data?.user?.mapValue?.fields?.name?.stringValue
            : data?.user?.mapValue?.fields?.username?.stringValue}
          &nbsp;&nbsp;&nbsp;
          <Text style={{ fontWeight: "500", fontSize: 15, marginLeft: 50 }}>
            {data?.alt_description?.stringValue}
          </Text>
        </Text>
      </View>
    </View>
  );
};
export default Posts;

const styles = StyleSheet.create({});
