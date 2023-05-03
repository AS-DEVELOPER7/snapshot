import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useUsersCollectionQuery,
  useUsersLikedPhotosQuery,
  useUsersPhotosQuery,
  useUsersProfileQuery,
} from "../app/services";
import { useStateContext } from "../context/StateContext";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Divider } from "@rneui/themed";
import AnimatedLoader from "react-native-animated-loader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Toast from "react-native-simple-toast";
import AccountLikes from "../components/account/AccountLikes";
import AccountPost from "../components/account/AccountPost";

const Account = ({ navigation }) => {
  const { userId } = useStateContext();
  const auth = getAuth();
  const focused = useIsFocused();
  const user = auth.currentUser;
  const storageref = ref(storage, `${user.uid}/profile/${user.uid}`);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [collections, setCollections] = useState([]);
  const [likes, setLikes] = useState([]);
  const [image, setImage] = useState();
  const [select, setSelect] = useState("Posts");
  const [postData, setPostData] = useState([]);
  const filter = [
    {
      title: "Posts",
      Icon: MaterialCommunityIcons,
      name: "image-outline",
      count: postData.length,
    },
    {
      title: "Likes",
      Icon: AntDesign,
      name: "hearto",
      count: likes.length,
    },
  ];

  // console.log(user);
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setLoading(false);
      setFollowing(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "favorites"), (data) => {
      // console.log(data);
      setLoading(false);
      setLikes(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "collection"), (data) => {
      // console.log(data);
      setLoading(false);
      setCollections(data.docs);
    });
    getDownloadURL(storageref).then((data) => {
      setImage(data);
      // console.log(data);
    });
    listAll(
      ref(storage, `gs://unsplash-ede8f.appspot.com/${user.uid} /posts`)
    ).then((data) => {
      // setImage(data);
      // console.log(data);
      setLoading(false);
      setPostData(data.items);
    });
  }, [focused]);
  // console.log(following);
  const handleSingout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Toast.show("Logout successfully!", Toast.SHORT);
      })
      .catch((error) => {
        // An error happened.
        Toast.show(
          "Something went wrong. Please try again later!",
          Toast.SHORT
        );
      });
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={{ height: "90%", width: "100%" }}>
        {loading ? (
          <View
            style={{
              height: "80%",
              // justifyContent: "center",
              // backgroundColor: "black",
            }}
          >
            <AnimatedLoader
              visible={loading}
              overlayColor="rgba(255,255,255,0)"
              source={require("../assets/93019-loading-18.json")}
              animationStyle={styles.lottie}
              speed={1}
            />
          </View>
        ) : (
          <ScrollView scrollEnabled>
            <View
              style={{ alignItems: "center", marginTop: 30, width: "100%" }}
            >
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../assets/profile-placeholder.png")
                }
                style={{ height: 120, width: 120, borderRadius: 120 / 2 }}
                resizeMode={"contain"}
              />

              <Text
                style={{
                  fontWeight: "800",
                  marginRight: 5,
                  fontSize: 19,
                  letterSpacing: 2,
                  marginTop: 10,
                }}
                numberOfLines={1}
              >
                {user.displayName}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: 15,
                  width: "100%",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    {postData.length}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Posts</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>0</Text>
                  <Text style={{ fontWeight: "600" }}>Followers</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserList")}
                  style={{ alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    {following?.length}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Following</Text>
                </TouchableOpacity>
                {/* <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 20 }}>
                  // {userProfile?.data?.downloads}
                </Text>
                <Text style={{ fontWeight: "600" }}>Downloads</Text>
              </View> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    // borderWidth: 2,
                    backgroundColor: "black",

                    paddingVertical: 12,
                    borderRadius: 15,
                    width: "40%",
                  }}
                  onPress={() => navigation.navigate("AccountEdit")}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      fontWeight: "700",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: "black",

                    paddingVertical: 11,
                    borderRadius: 15,
                    width: "40%",
                  }}
                  onPress={() => handleSingout()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      fontWeight: "700",
                      fontSize: 16,
                      color: "black",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider width={1} style={{ marginTop: 30 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 15,
                backgroundColor: "#d8d8d8",
                padding: 5,
                borderRadius: 30,
              }}
            >
              {filter.map((data, key) => (
                <TouchableOpacity
                  onPress={() => setSelect(data.title)}
                  key={key}
                  style={[
                    data.title === select
                      ? {
                          backgroundColor: "white",
                          borderRadius: 25,
                        }
                      : {},
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                      height: 40,
                      // backgroundColor: "#c4c4c4",
                    },
                  ]}
                >
                  <data.Icon
                    name={data.name}
                    size={25}
                    color="black"
                    style={{}}
                  />
                  <Text style={{ marginLeft: 10, fontWeight: "800" }}>
                    {data.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ marginTop: 10, width: "100%" }}>
              {select === "Posts" ? (
                <AccountPost data={postData} />
              ) : (
                <AccountLikes data={likes} />
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
