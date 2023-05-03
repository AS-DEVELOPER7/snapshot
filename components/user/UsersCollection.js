import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import Collections from "../Collections";

const UsersCollection = ({ data, page, setPage }) => {
  // console.log(data);
  return (
    <>
      {data?.length > 0 ? (
        <FlatList
          style={{
            height: "100%",
            width: "100%",
          }}
          nestedScrollEnabled={true}
          data={data}
          renderItem={(item) => <Collections data={item.item} />}
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
            height: 200,
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 17, letterSpacing: 2 }}>
            there are no Collections
          </Text>
        </View>
      )}
    </>
  );
};

export default UsersCollection;

const styles = StyleSheet.create({});
