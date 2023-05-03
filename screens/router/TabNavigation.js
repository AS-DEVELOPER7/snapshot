import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import Account from "../Account";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import SearchStack from "./SearchStack";
// import FavouriteStack from "./PostStack";
import Home from "../Home";
import AccountStack from "./AccountStack";
import PostStack from "./PostStack";
import Collectionstack from "./collectionStack";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderRadius: 25,

          margin: 10,
          height: 60,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        children={() => {
          return (
            <>
              {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
              <HomeStack />
            </>
          );
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            console.log(route);

            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (tabinfo) => {
            return (
              <View
                style={{
                  // backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Octicons
                  name="home"
                  size={24}
                  color={tabinfo.focused ? "#8c66e1" : "white"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        children={() => {
          return (
            <>
              {/* <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" /> */}
              <SearchStack />
            </>
          );
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // console.log(e);
            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (tabinfo) => {
            return (
              <View
                style={{
                  // backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="search"
                  size={24}
                  color={tabinfo.focused ? "#8c66e1" : "white"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="PostStack"
        // component={PostStack}
        children={() => {
          return (
            <>
              {/* <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" /> */}
              <PostStack />
            </>
          );
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // console.log(e);
            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (tabinfo) => {
            return (
              <View
                style={{
                  backgroundColor: "#1a1a1a",
                  marginBottom: 50,

                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 80 / 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 35,
                    padding: 15,
                  }}
                >
                  <Feather
                    name="plus"
                    size={36}
                    color="#8c66e1"
                    // color={tabinfo.focused ? "#8c66e1" : "white"}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CollectionStack"
        // component={CollectionStack}
        children={() => {
          return (
            <>
              {/* <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" /> */}
              <Collectionstack />
            </>
          );
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // console.log(e);
            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (tabinfo) => {
            return (
              <View
                style={{
                  // backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="collections"
                  size={24}
                  color={tabinfo.focused ? "#8c66e1" : "white"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="AccountStack"
        children={() => {
          return (
            <>
              {/* <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" /> */}
              <AccountStack />
            </>
          );
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // console.log(e);
            navigation.navigate(route.name);
          },
        })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (tabinfo) => {
            return (
              <View
                style={{
                  // backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name="user"
                  size={25}
                  color={tabinfo.focused ? "#8c66e1" : "white"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
