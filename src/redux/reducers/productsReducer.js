import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return { items: payload };
    default:
      return state;
  }
};
