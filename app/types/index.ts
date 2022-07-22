import store from "../store";

interface Base {
  createdAt: string | number;
  name: string;
  id: string;
}

export interface Product extends Base {
  avatar: string;
  developerEmail: string;
  price: string;
  category: string;
  description: string;
}

export interface Category extends Base {}

export interface ApiClient {
  getCategories: () => Promise<Category[]>;
  getCategory: (id: string) => Promise<Category>;
  getProducts: () => Promise<Product[]>;
  getProduct: (id: string) => Promise<Product>;
  addProduct: (product: Product) => Promise<Response>;
}

//TODO: Get from .env file
const baseApiUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study";

export const ApiUrls = {
  categories: `${baseApiUrl}/categories/`,
  products: `${baseApiUrl}/products/`,
  category: (id: string) => `${baseApiUrl}/categories/${id}`,
  product: (id: string) => `${baseApiUrl}products/${id}`,
  addProduct: `${baseApiUrl}/products/`
};

export interface HomeSliceState {
  categories: Category[];
  products: Product[];
  isAddingProduct: boolean;
  shouldRefreshProductList: boolean;
}

// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
