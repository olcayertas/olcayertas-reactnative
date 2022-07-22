import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { getCategoriesThunk, getProductsThunk } from "../store/actions";
import { Colors } from "../constants";
import { Category, Product, RootState } from "../types";
import { AddItemScreenNavigationProps } from "../navigation/types";
import Header from "../components/Header";
import StoreItemView from "../components/StoreItemView";


const UPaymentStoreScreen = () => {
  const navigation = useNavigation<AddItemScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };
  const categories = useSelector<RootState, Category[]>(state => state.categories);
  const products = useSelector<RootState, Product[]>(state => state.products);
  const shouldRefreshProductList = useSelector<RootState, boolean>(state => state.shouldRefreshProductList);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [data, setData] = useState([]);
  const onCategorySelected = (category: Category) => setSelectedCategory(category);

  const onPressAdd = () => navigation.navigate("Add");
  const renderItem = (item: ListRenderItemInfo<Product>) => <StoreItemView id={item.item.id} />;
  const isInCategory = (product: Product) =>
    selectedCategory?.name === "All" ||
    product.category?.toLowerCase() === selectedCategory?.name.toLowerCase();

  const onSearchTextChange = (text: string) => {
    if (text.length > 0) {
      setData(products.filter(product => isInCategory(product) && product.name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setData(products);
    }
  }

  useEffect(() => {
    if (shouldRefreshProductList) {
      dispatch(getProductsThunk());
    }
  }, [shouldRefreshProductList]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getProductsThunk());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    if (categories.length > 0 && products.length > 0) {
      setIsLoading(false);
    }
  }, [categories, products]);

  return (
    <SafeAreaView edges={["top"]}>
      <View style={[backgroundStyle, { height: "100%" }]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <View style={{ paddingHorizontal: 8 }}>
          <Header
            onCategorySelected={onCategorySelected}
            onSearchTextChange={onSearchTextChange}
          />
        </View>
        {isLoading && <ActivityIndicator size="large" color="grey" />}
        <FlatList
          numColumns={2}
          data={data.filter(isInCategory)}
          style={styles.list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
      <Pressable style={styles.plusButton} onPress={onPressAdd}>
        <Text style={styles.plusText}>＋</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UPaymentStoreScreen;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
    backgroundColor: Colors.lighter
  },
  plusButton: {
    borderWidth: 2,
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  plusText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black"
  }
});
