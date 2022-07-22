import * as React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ItemDetailScreenRouteProps } from "../navigation/types";
import LinearGradient from "react-native-linear-gradient";


const ProductDetailScreen = () => {
  const route = useRoute<ItemDetailScreenRouteProps>();
  const { product } = route.params ?? {};
  const { avatar, name, price, description } = product;
  const uri = avatar != null && avatar !== "" ? avatar : undefined;
  console.info("URI:", uri);
  return (
    <ScrollView style={styles.scrollView}>
      <Image style={styles.image} source={{ uri }} />
      <LinearGradient style={{ height: 80 }} colors={["white", "gray"]} />
      <View style={styles.infoRoot}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoHeader}>{name}</Text>
          <Text style={[styles.infoHeader, { marginStart: "auto" }]}>${price}</Text>
        </View>
        <Text style={[styles.infoDescription, { marginTop: 12 }]}>{description}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollView: {
    flex: 1,
    backgroundColor: "black"
  },
  image: {
    backgroundColor: "white",
    resizeMode: "contain",
    width,
    height: 240
  },
  infoRoot: {
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: -12,
    paddingBottom: "auto"
  },
  infoHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  infoDescription: {
    color: "white"
  }
});
