import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { Image } from "react-native";

const Posts = ({ data }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getDownloadURL(ref(storage, data.fullPath)).then((data) => {
      setUrl(data);
      // console.log(data);
    });
  }, []);
  return (
    <Image
      source={{ uri: url }}
      style={{ height: 100, width: 100, borderRadius: 10 }}
      resizeMode={"cover"}
    />
  );
};

export default Posts;

const styles = StyleSheet.create({});
