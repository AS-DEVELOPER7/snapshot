import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home";
import UserProfile from "../UserProfile";
import UserCollection from "../UserCollection";
import CollectionList from "../CollectionList";
import Postdetail from "../Postdetail";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UserCollection" component={UserCollection} />
      <Stack.Screen name="PostDetail" component={Postdetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
