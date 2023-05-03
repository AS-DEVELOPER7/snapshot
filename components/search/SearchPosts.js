import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Posts from "../Posts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import HomePosts from "../HomePosts";

const SearchPosts = ({ posts, data, page, setPage }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [favorite, setFavorite] = useState([]);
  const [collections, setCollections] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "favorites"), (data) => {
      // console.log(data);
      setFavorite(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setFollowing(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "collection"), (data) => {
      // console.log(data);
      setCollections(data.docs);
    });
  }, []);
  console.log(data);
  return (
    <>
      {data?.length > 0 ? (
        <FlatList
          style={{
            height: "100%",
            width: "100%",
          }}
          data={data}
          renderItem={(item) => (
            <HomePosts
              data={item.item}
              favorite={favorite}
              following={following}
              collections={collections}
            />
          )}
          // renderItem={(item) => <Text>{item.item.id}</Text>}
          keyExtractor={(item) => item.id}
          onEndReached={() =>
            posts?.data?.total_pages < 1
              ? ""
              : posts?.data?.total_pages === page
              ? ""
              : setPage(page + 1)
          }
          initialNumToRender={10}
          onEndReachedThreshold={2}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 17, letterSpacing: 2 }}>
            Posts not found
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchPosts;

const styles = StyleSheet.create({});
