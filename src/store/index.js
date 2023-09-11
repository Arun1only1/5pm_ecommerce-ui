import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productReducer,
  },
});

export default store;
