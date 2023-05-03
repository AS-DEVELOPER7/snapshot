import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../Account";
import Postdetail from "../Postdetail";
import AccountPostDetails from "../AccountPostDetails";
import AccountEdit from "../AccountEdit";
import UserList from "../UserList";
import UserProfile from "../UserProfile";
import UserCollection from "../UserCollection";

const AccountStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="AccountEdit" component={AccountEdit} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UserCollection" component={UserCollection} />
      <Stack.Screen name="PostDetail" component={Postdetail} />
      <Stack.Screen name="AccountPostDetail" component={AccountPostDetails} />
      <Stack.Screen name="UserList" component={UserList} />
    </Stack.Navigator>
  );
};

export default AccountStack;

const styles = StyleSheet.create({});
