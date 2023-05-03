import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Collections from "../Collections";

const SearchCollections = ({ collections, data, page, setPage }) => {
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
          renderItem={(item) => <Collections data={item.item} />}
          // renderItem={(item) => <Text>{item.item.id}</Text>}
          keyExtractor={(item) => item.id}
          onEndReached={() =>
            collections?.data?.total_pages < 1
              ? ""
              : collections?.data?.total_pages === page
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
            Collections not found
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchCollections;

const styles = StyleSheet.create({});
