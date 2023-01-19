import axios from "axios";
// Peticiones http: GET, POST, PUT, DELETE
// Bibliotecas Fetch y Axios

// interface Data {
//   id: number,
//   name: string,
//   description: string,
//   price: number,
//   inStock: boolean,
// }

const productsApi = axios.create({
  baseURL: "http://localhost:3003",
});

export async function getProducts() {
  const resp = await productsApi.get("/products");
  return resp.data;
}

export function createProduct(product: string | number) {
  return productsApi.post("/products", product);
}

export function deleteProduct(id: string | number) {
  return productsApi.delete(`/products/${id}`);
}

export function updateProduct(product: any) {
  return productsApi.put(`/products/${product.id}`, product);
}
