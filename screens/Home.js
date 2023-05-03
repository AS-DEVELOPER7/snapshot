import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useEditorialImagesQuery } from "../app/services";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import HomePosts from "../components/HomePosts";
import AnimatedLoader from "react-native-animated-loader";

const Home = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [favorite, setFavorite] = useState([]);
  const [collections, setCollections] = useState([]);
  const [following, setFollowing] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const editorial = useEditorialImagesQuery(page);
  console.log(editorial);
  // console.log(user);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // setData([]);
    // setRefresh(true);
    // setLoading(true);
    // setPage(0);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace("Home");
      // navigation.navigate("Home");
      // window.location.reload;
    }, 2000);
  }, []);

  const addArrays = (array1, array2) => {
    // Combine the two arrays and filter out any duplicate items
    const combinedArray = [...array1, ...array2];
    const filteredArray = combinedArray.filter((item, index) => {
      return combinedArray.findIndex((i) => i.id === item.id) === index;
    });

    // Set the filtered array as the new state
    setData(filteredArray);
    console.log(filteredArray);
    setLoading(false);
  };
  useEffect(() => {
    editorial.isFetching ? "" : addArrays(data, editorial?.data);
    // console.log(data);
  }, [editorial.isFetching]);

  useEffect(() => {
    // console.log(data);
    data.length > 0 ? setLoading(false) : setLoading(true);
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
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
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
      <View style={{ height: "95%", alignItems: "center", width: "100%" }}>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 30,
            marginBottom: 10,
            textAlign: "left",
            width: "100%",
          }}
        >
          Explore
        </Text>

        {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></ScrollView> */}
        {loading ? (
          <View
            style={{
              height: "80%",
              // justifyContent: "center",
              // backgroundColor: "black",
            }}
          >
            <AnimatedLoader
              visible={loading}
              overlayColor="rgba(255,255,255,0)"
              source={require("../assets/93019-loading-18.json")}
              animationStyle={styles.lottie}
              speed={1}
            />
          </View>
        ) : (
          <FlatList
            style={{
              height: "100%",
              width: "100%",
            }}
            data={data}
            renderItem={(item) => (
              <HomePosts
                data={item.item}
                favorite={favorite}
                following={following}
                collections={collections}
              />
            )}
            // renderItem={(item) => <Text>{item.item.id}</Text>}
            keyExtractor={(item) => item.id}
            onEndReached={() => setPage(page + 1)}
            initialNumToRender={10}
            onEndReachedThreshold={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
