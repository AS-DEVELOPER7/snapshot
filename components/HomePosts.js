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
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../context/StateContext";

const HomePosts = ({ data, favorite, following, collections }) => {
  const navigation = useNavigation();
  const { setUserId } = useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log(favorite);
  const handleFavorite = async (data) => {
    favorite.some((d) => d.id === data.id)
      ? deleteDoc(doc(db, "data", user.uid, "favorites", data.id))
      : await setDoc(doc(db, "data", user.uid, "favorites", data.id), {
          alt_description: data.alt_description,
          id: data.id,
          user: {
            for_hire: data.user.for_hire,
            profile_image: {
              medium: data.user.profile_image.medium,
            },
            id: data.user.id,
            name: data.user.name,
            username: data.user.username,
          },
          urls: {
            regular: data.urls.regular,
          },
          likes: data.likes,
          links: {
            download: data.links.download,
          },
        });
    console.log(data);
  };
  const handleCollection = async (data) => {
    collections.some((d) => d.id === data.id)
      ? deleteDoc(doc(db, "data", user.uid, "collection", data.id))
      : await setDoc(doc(db, "data", user.uid, "collection", data.id), {
          alt_description: data.alt_description,
          id: data.id,
          user: {
            for_hire: data.user.for_hire,
            profile_image: {
              medium: data.user.profile_image.medium,
            },
            id: data.user.id,
            name: data.user.name,
            username: data.user.username,
          },
          urls: {
            regular: data.urls.regular,
          },
          likes: data?.likes,
          links: {
            download: data.links.download,
          },
        });
    console.log(data);
  };
  const handleFollow = async (data) => {
    following.some((d) => d.id === data.user.id)
      ? deleteDoc(doc(db, "data", user.uid, "Following", data.user.id))
      : await setDoc(doc(db, "data", user.uid, "Following", data.user.id), {
          for_hire: data.user.for_hire,
          profile_image: {
            medium: data.user.profile_image.medium,
          },
          id: data.user.id,
          name: data.user.name,
          username: data.user.username,
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
          onPress={() => handleUserNavigation(data.user.username)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: data?.user?.profile_image?.medium }}
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
                {data?.user?.name ? data?.user?.name : data?.user?.username}
              </Text>
              {data?.user?.for_hire ? (
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
            {following.some((d) => d.id === data.user.id)
              ? "Following"
              : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: data?.urls?.regular }}
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
            {favorite.some((d) => d.id === data.id) ? (
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
            {collections.some((d) => d.id === data.id) ? (
              <Ionicons name="bookmark" size={24} color="black" />
            ) : (
              <Ionicons name="bookmark-outline" size={24} color="black" />
            )}
          </TouchableNativeFeedback>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(data.links.download).catch((err) =>
              console.error("Error downloading image: ", err)
            )
          }
        >
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "800", marginLeft: 10, marginBottom: 10 }}>
        {favorite.some((d) => d.id === data?.id)
          ? data?.likes + 1
          : data?.likes}
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
          {data?.user?.name ? data?.user?.name : data?.user?.username}
          &nbsp;&nbsp;&nbsp;
          <Text style={{ fontWeight: "500", fontSize: 15, marginLeft: 50 }}>
            {data.alt_description}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default HomePosts;

const styles = StyleSheet.create({});
