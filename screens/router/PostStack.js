import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "../Post";

const PostStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="post"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Post" component={Post} />
      {/* <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="TouristDetails" component={TouristDetails} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="QandA" component={QandA} /> */}
    </Stack.Navigator>
  );
};

export default PostStack;

const styles = StyleSheet.create({});
