import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import {
  useSearchCollectionsQuery,
  useSearchPhotosQuery,
  useSearchUsersQuery,
} from "../app/services";
import AnimatedLoader from "react-native-animated-loader";

import SearchPosts from "../components/search/SearchPosts";
import SearchUsers from "../components/search/SearchUsers";
import SearchCollections from "../components/search/SearchCollections";
const Search = () => {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [PostsPage, setPostsPage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const posts = useSearchPhotosQuery({
    searched: searchValue,
    page: PostsPage,
  });
  const collection = useSearchCollectionsQuery({
    searched: searchValue,
    page: collectionPage,
  });
  const user = useSearchUsersQuery({ searched: searchValue, page: userPage });
  console.log(collection);
  const [postData, setPostData] = useState();
  const [collectionData, setCollectionData] = useState();
  const [userData, setUserData] = useState();
  const [select, setSelect] = useState("Posts");
  const filter = [
    { title: "Posts", Icon: MaterialCommunityIcons, name: "image-outline" },
    {
      title: "Collections",
      Icon: MaterialCommunityIcons,
      name: "image-multiple-outline",
    },
    { title: "Users", Icon: Feather, name: "users" },
  ];
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
          posts?.data?.results
        );
    // console.log(data);
  }, [posts.isFetching]);
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
    collection.isFetching
      ? ""
      : collectionaddArrays(
          collectionData === undefined ? [] : collectionData,
          collection?.data?.results
        );
    // console.log(data);
  }, [collection.isFetching]);
  const useraddArrays = (array1, array2) => {
    // Combine the two arrays and filter out any duplicate items
    const combinedArray = [...array1, ...array2];
    const filteredArray = combinedArray.filter((item, index) => {
      return combinedArray.findIndex((i) => i.id === item.id) === index;
    });

    // Set the filtered array as the new state
    setUserData(filteredArray);
    setLoading(false);
  };
  useEffect(() => {
    user.isFetching
      ? ""
      : useraddArrays(
          userData === undefined ? [] : userData,
          user?.data?.results
        );
    // console.log(data);
  }, [user.isFetching]);

  useEffect(() => {
    console.log(postData);
    postData === undefined ? setLoading(true) : setLoading(false);
  });
  const handleSearch = () => {
    setPostData();
    setUserData();
    setCollectionData();
    setUserPage(1);
    setCollectionPage(1);
    setPostsPage(1);
    setSearchValue(search);
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
      <View
        style={{
          borderWidth: 2,
          borderColor: "black",
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          borderRadius: 20,
        }}
      >
        <Entypo name="circle" size={24} color="black" />
        <TextInput
          value={search}
          onChangeText={(e) => setSearch(e)}
          onSubmitEditing={() => handleSearch()}
          placeholder="Search Images, collections, user Profile"
          style={{ width: "100%", marginLeft: 10, fontSize: 15 }}
        />
      </View>
      {searchValue === "" ? (
        <></>
      ) : loading ? (
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
        <View
          style={{
            // backgroundColor: "black",
            height: "87%",
            width: "100%",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#d8d8d8",
              padding: 5,
              borderRadius: 30,
              marginBottom: 5,
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
                    width: "31%",
                    height: 40,
                    // backgroundColor: "#c4c4c4",
                  },
                ]}
              >
                <data.Icon
                  name={data.name}
                  size={18}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text>{data.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {select === "Posts" ? (
            <SearchPosts
              posts={posts}
              data={postData}
              page={PostsPage}
              setPage={setPostsPage}
            />
          ) : select === "Collections" ? (
            <SearchCollections
              collections={collection}
              data={collectionData}
              page={collectionPage}
              setPage={setCollectionPage}
            />
          ) : (
            <SearchUsers
              users={user}
              data={userData}
              page={userPage}
              setPage={setUserPage}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
