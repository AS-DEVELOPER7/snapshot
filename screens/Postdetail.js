import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { usePostDetailQuery } from "../app/services";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomePosts from "../components/HomePosts";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ScrollView } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
const Postdetail = ({ navigation }) => {
  const { postId } = useStateContext();
  const detail = usePostDetailQuery(postId);
  const auth = getAuth();
  const user = auth.currentUser;
  const [favorite, setFavorite] = useState([]);
  const [collections, setCollections] = useState([]);
  const [following, setFollowing] = useState([]);
  console.log(detail);
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
    <>
      {detail.isFetching ? (
        <View
          style={{
            height: "80%",
            // justifyContent: "center",
            // backgroundColor: "black",
          }}
        >
          <AnimatedLoader
            visible={detail.isFetching}
            overlayColor="rgba(255,255,255,0)"
            source={require("../assets/93019-loading-18.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            backgroundColor: "#f5f5f5",
            width: "100%",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginBottom: 10,
              // backgroundColor: "black",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                left: 0,
                // backgroundColor: "black",
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}>
              {/* {userId} */} Post
            </Text>
          </View>

          <View style={{ height: "90%", width: "100%" }}>
            <ScrollView>
              <HomePosts
                data={detail?.data}
                following={following}
                favorite={favorite}
                collections={collections}
              />
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default Postdetail;

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 350,
  },
});
