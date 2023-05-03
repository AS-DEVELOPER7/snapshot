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
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Divider } from "@rneui/themed";
import AnimatedLoader from "react-native-animated-loader";
import UsersCollection from "../components/user/UsersCollection";
import UserPosts from "../components/user/UserPosts";
import UserLikes from "../components/user/UserLikes";
import SearchPosts from "../components/search/SearchPosts";
const UserProfile = ({ navigation }) => {
  const { userId } = useStateContext();
  const auth = getAuth();

  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [PostsPage, setPostsPage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [likePage, setLikePage] = useState(1);
  const [select, setSelect] = useState("Posts");
  const userProfile = useUsersProfileQuery(userId);
  const userPosts = useUsersPhotosQuery({ id: userId, page: PostsPage });
  const userCollections = useUsersCollectionQuery({
    id: userId,
    page: collectionPage,
  });
  const userLikes = useUsersLikedPhotosQuery({ id: userId, page: likePage });
  const [postData, setPostData] = useState();
  const [collectionData, setCollectionData] = useState();
  const [likeData, setLikeData] = useState();
  console.log(userCollections);
  const filter = [
    {
      title: "Posts",
      Icon: MaterialCommunityIcons,
      name: "image-outline",
      count: userProfile?.data?.total_photos,
    },
    {
      title: "Collections",
      Icon: MaterialCommunityIcons,
      name: "image-multiple-outline",
      count: userProfile?.data?.total_collections,
    },
    {
      title: "likes",
      Icon: AntDesign,
      name: "hearto",
      count: userProfile?.data?.total_likes,
    },
  ];
  console.log(userProfile);
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setFollowing(data.docs);
    });
  }, []);
  const postaddArrays = (array1, array2) => {
    // Combine the two arrays and filter out any duplicate items
    const combinedArray = [...array1, ...array2];
    const filteredArray = combinedArray.filter((item, index) => {
      return combinedArray.findIndex((i) => i.id === item.id) === index;
    });

    // Set the filtered array as the new state
    setPostData(filteredArray);
    setLoading(false);
  };
  useEffect(() => {
    userPosts.isFetching
      ? ""
      : postaddArrays(
          postData === undefined ? [] : postData,
          userPosts?.data === undefined ? [] : userPosts?.data
        );
    // console.log(data);
  }, [userPosts.isFetching]);
  const collectionaddArrays = (array1, array2) => {
    // Combine the two arrays and filter out any duplicate items
    const combinedArray = [...array1, ...array2];
    const filteredArray = combinedArray.filter((item, index) => {
      return combinedArray.findIndex((i) => i.id === item.id) === index;
    });

    // Set the filtered array as the new state
    setCollectionData(filteredArray);
    setLoading(false);
  };
  useEffect(() => {
    userCollections.isFetching
      ? ""
      : collectionaddArrays(
          collectionData === undefined ? [] : collectionData,
          userCollections?.data === undefined ? [] : userCollections?.data
        );
    // console.log(data);
  }, [userCollections.isFetching]);
  const likeaddArrays = (array1, array2) => {
    // Combine the two arrays and filter out any duplicate items
    const combinedArray = [...array1, ...array2];
    const filteredArray = combinedArray.filter((item, index) => {
      return combinedArray.findIndex((i) => i.id === item.id) === index;
    });

    // Set the filtered array as the new state
    setLikeData(filteredArray);
    setLoading(false);
  };
  useEffect(() => {
    userLikes.isFetching
      ? ""
      : likeaddArrays(
          likeData === undefined ? [] : likeData,
          userLikes?.data === undefined ? [] : userLikes?.data
        );
    // console.log(data);
  }, [userLikes.isFetching]);

  useEffect(() => {
    // console.log(postData);
    postData === undefined ||
    collectionData === undefined ||
    likeData === undefined
      ? setLoading(true)
      : setLoading(false);
  });
  const handleFollow = async (data) => {
    following.some((d) => d.id === userProfile.data.id)
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
        ) : userProfile.status === "rejected" ? (
          <View>
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
              <Text
                style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}
              >
                {userId}
              </Text>
            </View>
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "black",
              }}
            >
              <Text>
                User profile data is not available. Please try again later
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView scrollEnabled>
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
              <Text
                style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}
              >
                {userId}
              </Text>
            </View>

            <View
              style={{ alignItems: "center", marginTop: 30, width: "100%" }}
            >
              <Image
                source={{ uri: userProfile?.data?.profile_image?.medium }}
                style={{ height: 120, width: 120, borderRadius: 120 / 2 }}
                resizeMode={"contain"}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    marginRight: 5,
                    fontSize: 19,
                    letterSpacing: 2,
                  }}
                  numberOfLines={1}
                >
                  {userProfile?.data?.name}
                </Text>
                {userProfile?.data?.for_hire ? (
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={20}
                    color="#8c66e1"
                  />
                ) : (
                  <></>
                )}
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: "gray",
                  fontWeight: "600",
                  fontSize: 12,
                }}
              >
                {userProfile?.data?.bio}
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
                    {userProfile?.data?.total_photos}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Posts</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    {userProfile?.data?.total_collections}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Collections</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    {following.some((d) => d.id === userProfile?.data?.id)
                      ? userProfile?.data?.followers_count + 1
                      : userProfile?.data?.followers_count}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Followers</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    {userProfile?.data?.following_count}
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Following</Text>
                </View>
                {/* <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 20 }}>
                  {userProfile?.data?.downloads}
                </Text>
                <Text style={{ fontWeight: "600" }}>Downloads</Text>
              </View> */}
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 20,

                  backgroundColor: "black",

                  paddingVertical: 11,
                  borderRadius: 15,
                  width: "50%",
                }}
                onPress={() => handleFollow(userProfile?.data)}
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
                  {following.some((d) => d.id === userProfile?.data?.id)
                    ? "Following"
                    : "Follow"}
                </Text>
              </TouchableOpacity>
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
                      width: "30%",
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
            <View style={{ marginTop: 10 }}>
              {select === "Posts" ? (
                <UserPosts
                  data={postData}
                  page={PostsPage}
                  setPage={setPostsPage}
                />
              ) : select === "Collections" ? (
                <UsersCollection
                  data={collectionData}
                  page={collectionPage}
                  setPage={setCollectionPage}
                />
              ) : (
                <UserPosts
                  data={likeData}
                  page={likePage}
                  setPage={setLikePage}
                />
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
