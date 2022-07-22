import { Product } from "../types";

export const filterBadProducts = (product: Product) => (
  product.name != null && product.name !== "" && product.price != null && product.price !== ""
);

export const fetchData = <T>(url: string) => (
  fetch(url)
  .then(response => response.json())
  .then(data => data as T)
);
