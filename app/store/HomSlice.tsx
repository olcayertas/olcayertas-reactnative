import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { HomeSliceState, RootState } from "../types";
import { addProductThunk, getCategoriesThunk, getProductsThunk } from "./actions";
import { filterBadProducts } from "../helpers";

const initialState: HomeSliceState = {
  categories: [],
  products: [],
  isAddingProduct: false,
  shouldRefreshProductList: false
};

export const homeSlice = createSlice<RootState, SliceCaseReducers<RootState>>({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categories = [
        {
          createdAt: "",
          name: "All",
          id: "0"
        }, ...action.payload.reverse()
      ];
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload.filter(filterBadProducts);
    });
    builder.addCase(addProductThunk.pending, (state, action) => {
      state.isAddingProduct = true;
    });
    builder.addCase(addProductThunk.rejected, (state, action) => {
      state.isAddingProduct = false;
    });
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      state.isAddingProduct = false;
      state.shouldRefreshProductList = true;
    });
  }
});


