import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../Search";
import UserProfile from "../UserProfile";
import UserCollection from "../UserCollection";
import Postdetail from "../Postdetail";

const SearchStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UserCollection" component={UserCollection} />
      <Stack.Screen name="PostDetail" component={Postdetail} />
    </Stack.Navigator>
  );
};

export default SearchStack;

const styles = StyleSheet.create({});
