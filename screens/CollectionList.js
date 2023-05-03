import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const CollectionList = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [collectionList, setCollectionList] = useState();
  const [loading, setLoading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const { data } = useStateContext();
  useEffect(() => {
    // onSnapshot(collection(db, "data", user.uid, "collection"), (data) => {
    //   console.log(
    //     data.docs[0]._document.data.value.mapValue.fields.data.arrayValue.values
    //   );
    //   setCollectionList(
    //     data?.docs[0]?._document?.data?.value?.mapValue?.fields?.data
    //       ?.arrayValue?.values
    //   );
    // });
  }, []);
  useEffect(() => {
    // console.log(collectionList);
    // collectionList;
    collectionList === undefined ? setLoading(false) : setLoading(true);
  });
  const handleCreateCollection = async () => {
    await setDoc(
      doc(
        db,
        "data",
        user.uid,
        "collections",
        "collection",
        collectionName,
        data.id
      ),
      {
        data: [{ ...data, belongsTo: collectionName }],
      }
    ).then((data) => {
      setOpenModel(false);
    });
  };
  return (
    <View style={{ height: "100%", backgroundColor: "#f5f5f5", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={
            {
              // backgroundColor: "black",
            }
          }
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "900", fontSize: 18, letterSpacing: 2 }}>
          Collection List
        </Text>
        <TouchableOpacity
          style={
            {
              // backgroundColor: "black",
            }
          }
          onPress={() => setOpenModel(true)}
        >
          <MaterialIcons name="library-add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "90%" }}>
        {loading ? (
          <View></View>
        ) : collectionList?.length === 0 ? (
          <View></View>
        ) : (
          <ScrollView></ScrollView>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModel}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setOpenModel(false);
        }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: 10,
          }}
        >
          <View
            style={{
              height: 250,
              backgroundColor: "white",
              width: "90%",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "space-evenly",
              borderRadius: 15,
              padding: 10,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                position: "relative",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                New collection
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,

                  // width: "100%",
                }}
                onPress={() => setOpenModel(false)}
              >
                <Text style={{ color: "red", fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 30, marginTop: 40, width: "100%" }}>
              <Text style={{ fontWeight: "700", marginBottom: 10 }}>Name</Text>
              <TextInput
                value={collectionName}
                onChangeText={(e) => setCollectionName(e)}
                placeholder="Enter collection name"
                style={{
                  borderColor: "black",
                  borderWidth: 2,
                  width: "100%",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              />
            </View>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() => handleCreateCollection()}
            >
              <Text
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  paddingVertical: 15,
                  width: "50%",
                  textAlign: "center",
                  borderRadius: 20,
                  fontWeight: "700",
                }}
              >
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollectionList;

const styles = StyleSheet.create({});
