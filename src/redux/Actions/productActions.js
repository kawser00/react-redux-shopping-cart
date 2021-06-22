import ActionTypes from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: ActionTypes.FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => async (dispatch) => {
  dispatch({
    type: ActionTypes.FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      //this is an variable that is storing filtered items
      filteredItems:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => async (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort(
      (a, b) => (sort === "lowest" ? a.price - b.price : b.price - a.price)

      //another way
      // sort === "lowest" ? a.price > b.price ? a : -1 : a.price > b.price ? -1 : 1

      // a = 1st val, b = 2nd val...
      // +1 = return accept and -1 = return reject
      // a - b means lowest to highest
      // b - a means highest to lowest
    );
  }

  dispatch({
    type: ActionTypes.ORDER_PRODUCTS_BY_SIZE,
    payload: {
      sort: sort,
      filteredItems: sortedProducts,
    },
  });
};
