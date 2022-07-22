import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import AddNewItemScreen from "./app/screens/AddNewItemScreen";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";
import UPaymentStoreScreen from "./app/screens/UPaymentStoreScreen";
import store from "./app/store";

const addScreenOptions = {
  headerShown: true,
  title: "Add New Product",
  headerStyle: { backgroundColor: "rgb(242,242,242)" }
};

const getDetailScreenOptions = ({ route }) => ({
  headerShown: true,
  title: route.params.product.name
});

const Stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
        <Stack.Screen name="Home" component={UPaymentStoreScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} options={getDetailScreenOptions} />
        <Stack.Screen name="Add" component={AddNewItemScreen} options={addScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
