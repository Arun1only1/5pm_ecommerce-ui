import { $axios } from "../axios";

export const addItemToCart = async (values) => {
  console.log({ values });
  return await $axios.post("/cart/add/item", values);
};
