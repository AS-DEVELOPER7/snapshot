import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "../Post";
import Collection from "../Collection";
import UserProfile from "../UserProfile";
import UserCollection from "../UserCollection";
import Postdetail from "../Postdetail";

const Collectionstack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Collection"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UserCollection" component={UserCollection} />
      <Stack.Screen name="PostDetail" component={Postdetail} />
    </Stack.Navigator>
  );
};

export default Collectionstack;

const styles = StyleSheet.create({});
