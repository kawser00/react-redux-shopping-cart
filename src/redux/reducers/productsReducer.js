import ActionTypes from "../types";

export const productsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: payload.size,
        filteredItems: payload.filteredItems, //this is an state that is storing filtered items
      };
      case ActionTypes.ORDER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        sort: payload.sort,
        filteredItems: payload.filteredItems, //this is an state that is storing filtered items
      };
    case ActionTypes.FETCH_PRODUCTS:
      return { items: payload, filteredItems: payload };
    default:
      return state;
  }
};
