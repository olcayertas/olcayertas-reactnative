import { ApiClient, ApiUrls, Category, Product } from "../types";
import { fetchData } from "../helpers";
import { categories, products } from "../constants";

export const storeApiClient: ApiClient = {
  getCategories: () => fetchData<Category[]>(ApiUrls.categories),
  getProducts: () => fetchData<Product[]>(ApiUrls.products),
  getCategory: id => fetchData<Category>(ApiUrls.category(id)),
  getProduct: id => fetchData<Product>(ApiUrls.product(id)),
  addProduct: product => fetch(ApiUrls.addProduct, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
};

export const mockStoreApiClient: ApiClient = {
  getCategories: () => new Promise<Category[]>(() => categories),
  getProducts: () => new Promise<Product[]>(() => products),
  getCategory: id => new Promise<Category>(() => categories.find(category => category.id === id)),
  getProduct: id => new Promise<Product>(() => products.find(product => product.id === id)),
  addProduct: product => new Promise<Response>(() => {})
};
