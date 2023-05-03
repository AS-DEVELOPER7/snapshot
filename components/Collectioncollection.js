import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Collections from "./Collections";

const Collectioncollection = ({ data }) => {
  console.log(data);
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
            Collections not found
          </Text>
        </View>
      )}
    </>
  );
};

export default Collectioncollection;

const styles = StyleSheet.create({});
