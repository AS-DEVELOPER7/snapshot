import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../context/StateContext";
import { Feather } from "@expo/vector-icons";
const Collections = ({ data }) => {
  const navigation = useNavigation();
  const { setCollectionId } = useStateContext();
  //   console.log(data);

  const handleUserNavigation = (id) => {
    setCollectionId(id);
    navigation.navigate("UserCollection");
  };
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 30,
      }}
      onPress={() => handleUserNavigation(data.id)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          source={{ uri: data?.user?.profile_image?.medium }}
          style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
          resizeMode={"contain"}
        />
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 15,
              letterSpacing: 2,
              width: "100%",
            }}
            numberOfLines={1}
          >
            {data?.title}
          </Text>
          <Text style={{ color: "gray", fontWeight: "700", fontSize: 12 }}>
            by {data?.user?.name}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 10 }}>
        <Image
          source={{ uri: data?.preview_photos[0]?.urls?.regular }}
          style={{ width: "100%", height: 170, borderRadius: 20 }}
          resizeMode={"cover"}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Image
            source={{ uri: data?.preview_photos[1]?.urls?.regular }}
            style={{ width: "30%", height: 100, borderRadius: 20 }}
            resizeMode={"cover"}
          />
          <Image
            source={{ uri: data?.preview_photos[2]?.urls?.regular }}
            style={{ width: "30%", height: 100, borderRadius: 20 }}
            resizeMode={"cover"}
          />
          <View style={{ width: "30%", height: 100, borderRadius: 20 }}>
            <Image
              source={{ uri: data?.preview_photos[3]?.urls?.regular }}
              style={{ width: "100%", height: 100, borderRadius: 20 }}
              blurRadius={15}
              resizeMode={"cover"}
            />
            <View
              style={{
                position: "absolute",
                top: 40,
                left: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
                + {data.total_photos}
              </Text>
              <Feather name="chevron-right" size={25} color="white" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Collections;

const styles = StyleSheet.create({});
