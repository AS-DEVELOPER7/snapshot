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
import Posts from "./Posts";

const AccountPost = ({ data }) => {
  const { setAccountPost } = useStateContext();
  const navigation = useNavigation();
  const handlePostDetail = (data) => {
    console.log(data);
    setAccountPost(data);
    navigation.navigate("AccountPostDetail");
  };
  console.log(data);
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
              onPress={() => handlePostDetail(item.item)}
              style={{ flex: 1 / 3, marginBottom: 15 }}
            >
              <Posts data={item.item} />
            </TouchableOpacity>
          )}
          // renderItem={(item) => <Text>{item.item.id}</Text>}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
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

export default AccountPost;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
