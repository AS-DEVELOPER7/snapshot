import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Users from "../Users";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";

const SearchUsers = ({ users, data, page, setPage }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setFollowing(data.docs);
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
            <Users data={item.item} following={following} />
          )}
          // renderItem={(item) => <Text>{item.item.id}</Text>}
          keyExtractor={(item) => item.id}
          onEndReached={() =>
            users?.data?.total_pages < 1
              ? ""
              : users?.data?.total_pages === page
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
            Users not found
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchUsers;

const styles = StyleSheet.create({});
