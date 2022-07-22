import * as React from "react";
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { Category, RootState } from "../types";
import { useSelector } from "react-redux";
import { useState } from "react";

interface Props {
  onCategorySelected: (category: Category) => void;
  style?: StyleProp<ViewStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
}

const Categories = (props: Props) => {
  const {
    onCategorySelected,
    style,
    selectedStyle,
    textStyle,
    selectedTextStyle
  } = props;

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const categories = useSelector<RootState, Category[]>(state => state.categories);

  const getButtonStyle = (category: Category) => (
    category.name === selectedCategory?.name
      ? [styles.categorySelected, selectedStyle]
      : [styles.category, style]
  );

  const getNameStyle = (category: Category) => (
    category.name === selectedCategory?.name
      ? [styles.categoryTextSelected, selectedTextStyle]
      : [styles.categoryText, textStyle]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
    >
      {categories?.map(category => (
        <Pressable
          key={category.id}
          style={getButtonStyle(category)}
          onPress={() => {
            onCategorySelected(category);
            setSelectedCategory(category);
          }}
        >
          <Text style={getNameStyle(category)}>{category.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Categories;

const containerBase = {
  flexDirection: "row",
  alignItems: "center"
};

const categoryBase = {
  borderWidth: 2,
  borderRadius: 8,
  marginStart: 8
};

const styles = StyleSheet.create({
  categoriesContainer: {
    ...containerBase,
    paddingBottom: 8,
    marginStart: -8
  },
  category: {
    ...categoryBase,
    padding: 8,
    backgroundColor: "black"
  },
  categoryText: {
    color: "white"
  },
  categorySelected: {
    ...categoryBase,
    padding: 10,
    backgroundColor: "white"
  },
  categoryTextSelected: {
    color: "black"
  }
});
