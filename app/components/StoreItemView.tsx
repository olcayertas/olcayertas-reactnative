import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Product, RootState } from "../types";
import { ItemDetailScreenNavigationProps } from "../navigation/types";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";


interface Props {
  id: string;
}

const StoreItemView = (props: Props) => {
  const { id } = props;
  const navigation = useNavigation<ItemDetailScreenNavigationProps>();
  const product = useSelector<RootState, Product>(state => state.products.find(product => product.id == id));
  const { avatar, name, price } = product;
  const uri = avatar != null && avatar !== "" ? avatar : undefined;
  const onPress = () => navigation.navigate("Detail", { product });
  return (
    <Pressable key={id} style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{ uri }} />
      <LinearGradient style={{ height: 40 }} colors={["white", "gray"]} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.infoText}>{name}</Text>
        <Text style={styles.infoText}>${price}</Text>
      </View>
    </Pressable>
  );
};

export default StoreItemView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "48%",
    marginBottom: 8,
    marginEnd: 8
  },
  image: {
    resizeMode: "contain",
    height: 120,
    width: "100%"
  },
  info: {
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: -12
  },
  infoText: {
    color: "white"
  }
});
