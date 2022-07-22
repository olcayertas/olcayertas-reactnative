import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Category } from "../types";
import Categories from "./Categories";
import { useEffect, useState } from "react";


interface Props {
  onCategorySelected?: (category: Category) => void;
  onSearchTextChange?: (searchText :string) => void;
}

const Header = (props: Props) => {
  const { onCategorySelected, onSearchTextChange } = props;
  const [title, setTitle] = useState("UPayment Store");
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

  useEffect(() => {
    if (isSearchInputVisible) {
      setTitle("UPS");
    } else {
      setTitle("UPayment Store");
    }
  }, [isSearchInputVisible]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {isSearchInputVisible && (
          <TextInput
            style={{ marginStart: 8 }}
            placeholder={"Search product"}
            onChangeText={onSearchTextChange}
          />
        )}
        <Pressable style={styles.headerSearchButton} onPress={() => {
          setIsSearchInputVisible(!isSearchInputVisible);
        }}>
          <Text style={styles.headerMagnifier}>🔍</Text>
        </Pressable>
      </View>
      <Categories onCategorySelected={onCategorySelected} />
    </View>
  );
};

export default Header;

const containerBase = {
  flexDirection: "row",
  alignItems: "center"
};

const styles = StyleSheet.create({
  headerContainer: {
    ...containerBase,
    paddingVertical: 16
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic"
  },
  headerSearchButton: {
    marginStart: "auto"
  },
  headerMagnifier: {
    fontSize: 16
  }
});
