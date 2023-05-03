import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import {
  useCollectionDetailsQuery,
  useCollectionPhotosQuery,
  useCollectionRelatedCollectionQuery,
} from "../app/services";
import { getAuth } from "firebase/auth";
import AnimatedLoader from "react-native-animated-loader";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Divider } from "@rneui/themed";
import UserPosts from "../components/user/UserPosts";
import UsersCollection from "../components/user/UsersCollection";
import Collections from "../components/Collections";
import Collectioncollection from "../components/Collectioncollection";
const UserCollection = ({ navigation }) => {
  const { collectionId } = useStateContext();
  const auth = getAuth();

  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [postsPage, setPostsPage] = useState(1);
  const [select, setSelect] = useState("Posts");
  const [postData, setPostData] = useState();
  const detail = useCollectionDetailsQuery(collectionId);
  const posts = useCollectionPhotosQuery({
    id: collectionId,
    page: postsPage,
  });
  const collection = useCollectionRelatedCollectionQuery(collectionId);
  console.log(collection);
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
    posts.isFetching
      ? ""
      : postaddArrays(
          postData === undefined ? [] : postData,
          posts?.data === undefined ? [] : posts?.data
        );
    // console.log(data);
  }, [posts.isFetching]);

  const filter = [
    {
      title: "Posts",
      Icon: MaterialCommunityIcons,
      name: "image-outline",
      count: detail?.data?.total_photos,
    },
    {
      title: "Collections",
      Icon: MaterialCommunityIcons,
      name: "image-multiple-outline",
      count: collection?.data?.length,
    },
  ];
  useEffect(() => {
    // console.log(postData);
    postData === undefined ? setLoading(true) : setLoading(false);
  });
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
        ) : detail.status === "rejected" ? (
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
                Collection
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
                {/* {userId} */}Collection
              </Text>
            </View>
            <View
              style={{ alignItems: "center", marginTop: 30, width: "100%" }}
            >
              <Image
                source={{ uri: detail?.data?.user?.profile_image?.medium }}
                style={{ height: 120, width: 120, borderRadius: 120 / 2 }}
                resizeMode={"contain"}
              />
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
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
                  {detail?.data?.title}
                </Text>
              </View>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "800",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                by {detail?.data?.user?.name}
              </Text>
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
            <View style={{ marginTop: 10 }}>
              {select === "Posts" ? (
                <UserPosts
                  data={postData}
                  page={postsPage}
                  setPage={setPostsPage}
                />
              ) : (
                <Collectioncollection data={collection?.data} />
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default UserCollection;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
