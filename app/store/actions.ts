import { storeApiClient } from "../api";
import { Category, Product } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategoriesThunk = createAsyncThunk<Category[]>(
  "home/getCategories",
  async () => {
    return await storeApiClient.getCategories();
  }
);

export const getProductsThunk = createAsyncThunk<Product[]>(
  "home/getProducts",
  async () => {
    return await storeApiClient.getProducts();
  }
);

export const addProductThunk = createAsyncThunk<Response, Product>(
  "home/addProduct",
  async (product: Product) => {
    return await storeApiClient.addProduct(product);
  }
);
