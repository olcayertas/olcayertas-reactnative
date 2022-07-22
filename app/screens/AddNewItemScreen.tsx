import * as React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Category, RootState } from "../types";
import { useAppDispatch } from "../hooks";
import { addProductThunk } from "../store/actions";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import InputWithErrorMessage from "../components/InputWithErrorMessage";


type NullableString = string | undefined;

const AddNewItemScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isAddingProduct = useSelector<RootState, boolean>(state => state.isAddingProduct);
  const shouldRefreshProductList = useSelector<RootState, boolean>(state => state.shouldRefreshProductList);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<NullableString>(undefined);

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState<NullableString>(undefined);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState<NullableString>(undefined);

  const [imageLink, setImageLink] = useState("");
  const [imageLinkError, setImageLinkError] = useState<NullableString>(undefined);

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [categoryError, setCategoryError] = useState<NullableString>(undefined);

  const onCategorySelected = (category: Category) => setCategory(category);

  const onPressAdd = () => {
    let hasError = false;

    if (title === "") {
      hasError = true;
      setTitleError("Please enter product title");
    }

    if (title.length < 3) {
      hasError = true;
      setTitleError("Product title must be at least 3 characters.");
    }

    if (price === "") {
      hasError = true;
      setPriceError("Please enter product price");
    }

    if (description === "") {
      hasError = true;
      setDescriptionError("Please enter product description.");
    }

    if (description.length < 20) {
      hasError = true;
      setDescriptionError("Product description must be at least 20 characters.");
    }

    if (imageLink === "") {
      hasError = true;
      setImageLinkError("Please enter product image link.");
    }

    if (category === undefined) {
      hasError = true;
      setCategoryError("Please select a product category.");
    }

    if (hasError) {
      return;
    }

    const createdAt = (new Date()).toUTCString();

    dispatch(addProductThunk({
      id: "",
      createdAt,
      name: title,
      price,
      description,
      avatar: imageLink,
      category: category.name,
      developerEmail: ""
    }));
  };

  useEffect(() => {
    if (shouldRefreshProductList) {
      navigation.goBack();
    }
  }, [shouldRefreshProductList]);

  useEffect(() => {
    if (title.length > 0) {
      setTitleError(undefined);
    }
  }, [title]);

  useEffect(() => {
    if (price.length > 0) {
      setPriceError(undefined);
    }
  }, [price]);

  useEffect(() => {
    if (description.length > 0) {
      setDescriptionError(undefined);
    }
  }, [description]);

  useEffect(() => {
    if (imageLink.length > 0) {
      setImageLinkError(undefined);
    }
  }, [imageLink]);

  useEffect(() => {
    if (category !== undefined) {
      setCategoryError(undefined);
    }
  }, [category]);

  return (
    <SafeAreaView edges={["bottom"]}>
      <ScrollView style={styles.scrollView}>
        <InputWithErrorMessage
          onChangeText={price => setTitle(price)}
          style={styles.input}
          placeholder={"Product title"}
          error={titleError}
        />
        <InputWithErrorMessage
          onChangeText={price => setPrice(price)}
          style={styles.input}
          placeholder={"Price"}
          keyboardType={"numeric"}
          error={priceError}
        />
        <InputWithErrorMessage
          onChangeText={description => setDescription(description)}
          style={styles.input}
          placeholder={"Description"}
          multiline={true}
          numberOfLines={4}
          height={80}
          error={descriptionError}
        />
        <InputWithErrorMessage
          onChangeText={imageLink => setImageLink(imageLink)}
          style={styles.input}
          placeholder={"Image link"}
          error={imageLinkError}
        />
        <Text style={styles.selectedCategory}>{"Category: " + (category ? category?.name : "")}</Text>
        {categoryError && <Text style={[styles.error, styles.categoryError]}>{categoryError}</Text>}
        <Categories
          onCategorySelected={onCategorySelected}
          style={styles.categories}
          selectedStyle={styles.selectedCategory2}
          textStyle={styles.categoryText}
          selectedTextStyle={styles.selectedCategoryText}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPressAdd}>
          <Text style={styles.buttonText}>{"Add Product"}</Text>
        </Pressable>
      </View>
      {isAddingProduct && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddNewItemScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    backgroundColor: "rgb(242,242,242)",
    height: "100%"
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 12
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    marginBottom: 10,
    alignSelf: "center"
  },
  button: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "black"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4
  },
  categories: {
    backgroundColor: "rgb(242,242,242)"
  },
  categoryText: {
    color: "black"
  },
  selectedCategoryText: {
    color: "white"
  },
  categoryError: {
    marginTop: -8,
    marginBottom: 12
  },
  selectedCategory: {
    marginVertical: 12
  },
  selectedCategory2: {
    backgroundColor: "black"
  },
  indicatorContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: 100,
    height: 100,
    top: (Dimensions.get("window").height / 2) - 50,
    left: (Dimensions.get("window").width / 2) - 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1
  }
});
