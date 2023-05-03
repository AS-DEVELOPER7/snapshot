import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import UserPost from "../UserPost";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Image } from "react-native";
import { useStateContext } from "../../context/StateContext";
import { useNavigation } from "@react-navigation/native";

const UserPosts = ({ data, page, setPage }) => {
  const { setPostId } = useStateContext();
  const navigation = useNavigation();

  const handlePostDetail = (id) => {
    setPostId(id);
    navigation.navigate("PostDetail");
  };
  return (
    <>
      {data?.length > 0 ? (
        <FlatList
          style={{ margin: 5 }}
          numColumns={3} // set number of columns
          columnWrapperStyle={{ justifyContent: "space-between" }}
          nestedScrollEnabled={true}
          data={data}
          renderItem={(item) => (
            // <UserPost
            //   data={item.item}
            //   collections={collections}
            //   favorite={favorite}
            // />
            <TouchableOpacity
              onPress={() => handlePostDetail(item.item.id)}
              style={{ flex: 1 / 3, marginBottom: 15 }}
            >
              <Image
                source={{ uri: item?.item?.urls?.regular }}
                style={{ height: 100, width: 100, borderRadius: 10 }}
                resizeMode={"cover"}
              />
            </TouchableOpacity>
          )}
          // renderItem={(item) => <Text>{item.item.id}</Text>}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage(page + 1)}
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
            There are no Posts
          </Text>
        </View>
      )}
    </>
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
