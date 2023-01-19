import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../pages/api/productsAPI";

export default function Products() {
  const useClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    error,
  }: { isLoading: any; data: any; isError: any; error: any } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
    select: (products) => products.reverse(),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product delete");
      useClient.invalidateQueries(["product"]);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Product update");
      useClient.invalidateQueries(["product"]);
    },
  });

  if (isLoading) <p>Loading...</p>;
  else if (isError) <p>Error: {error.message}</p>;

  return (
    <>
      <h2 className="mb-[10px] text-[30px]">Products List</h2>
      {products?.map((product: any) => (
        <div
          className="mb-[20px] flex w-[80ch] flex-col items-center"
          key={product.id}
        >
          <div className="mb-[5px] flex items-center">
            <h3 className="text-[20px]">{product.name}:</h3>
            <p className="ml-[10px]">${product.price}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => deleteProductMutation.mutate(product.id)}
              className="mr-[10px] rounded-full border border-red-500 bg-red-500 px-5 py-1 tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg"
            >
              Delete
            </button>
            <div className="flex items-center">
              <input
                id={product.id}
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                checked={product.inStock}
                onChange={(e) => {
                  console.log(e.target.checked);
                  updateProductMutation.mutate({
                    ...product,
                    inStock: e.target.checked,
                  });
                }}
              />
              <label htmlFor={product.id} className="ml-2 text-sm font-medium">
                In Stock
              </label>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
