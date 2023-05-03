import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Posts from "../components/Posts";
import AnimatedLoader from "react-native-animated-loader";

const Collection = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [favorite, setFavorite] = useState([]);
  const [collections, setCollections] = useState();
  const [following, setFollowing] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // setData([]);
    // setRefresh(true);
    // setLoading(true);
    // setPage(0);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace("Collection");
      // navigation.navigate("Home");
      // window.location.reload;
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(collections);
    collections === undefined ? setLoading(true) : setLoading(false);
  });
  useEffect(() => {
    onSnapshot(collection(db, "data", user.uid, "favorites"), (data) => {
      // console.log(data);
      setFavorite(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "Following"), (data) => {
      // console.log(data);
      setFollowing(data.docs);
    });
    onSnapshot(collection(db, "data", user.uid, "collection"), (data) => {
      // console.log(data);
      setCollections(data.docs);
    });
  }, []);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#f5f5f5",
        padding: 20,
        width: "100%",
      }}
    >
      <StatusBar backgroundColor="#f5f5f5" barStyle={"dark-content"} />
      <View
        style={{
          height: "95%",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontWeight: "900",
            fontSize: 30,
            marginBottom: 10,
            textAlign: "left",
            width: "100%",
          }}
        >
          Collection
        </Text>

        {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></ScrollView> */}
        {loading ? (
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0)"
            source={require("../assets/93019-loading-18.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
        ) : // <></>
        collections.length === 0 ? (
          <View
            style={{
              height: "80%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "800", fontSize: 22, letterSpacing: 2 }}>
              Collection is empty
            </Text>
          </View>
        ) : (
          <FlatList
            style={{
              height: "100%",
              width: "100%",
            }}
            data={collections}
            renderItem={
              (item) => (
                <Posts
                  data={item.item._document.data.value.mapValue.fields}
                  favorite={favorite}
                  following={following}
                  collections={collections}
                />
              )
              // console.log(item)
            }
            // renderItem={(item) => <Text>{item.item.id}</Text>}
            keyExtractor={(item, index) => index}
            initialNumToRender={10}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
