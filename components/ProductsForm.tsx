import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../pages/api/productsAPI";

export default function ProductsForm() {
  const useClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      useClient.invalidateQueries(["product"]);
      console.log("Product added");
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const product: any = Object.fromEntries(form);
    addProductMutation.mutate({ ...product, inStock: true });
    console.log(product);
    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-[30px]">
        <div className="flex w-[80ch] flex-col items-center justify-center rounded-[40px] border-[4px] border-solid border-blue-500">
          <h1 className="mb-[5px] mt-[10px] text-[30px]">Products Form</h1>
          <div className="mb-[10px] w-[200px]">
            <label
              htmlFor="name"
              className="mb-[5px] block text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-[5px] text-black focus:border-blue-500 focus:ring-blue-500"
              name="name"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-[10px] w-[200px]">
            <label
              htmlFor="description"
              className="mb-[5px] block text-sm font-medium"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-[5px] text-black focus:border-blue-500 focus:ring-blue-500"
              name="description"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-[10px] w-[200px]">
            <label
              htmlFor="price"
              className="mb-[5px] block text-sm font-medium"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-[5px] text-black focus:border-blue-500 focus:ring-blue-500"
              name="price"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-[30px] flex justify-center">
            <button
              type="submit"
              className="mr-[10px] rounded-full border border-red-500 bg-red-500 px-5 py-1 tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
