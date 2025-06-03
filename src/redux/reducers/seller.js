import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSeller: false,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // Load single seller
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })

    // Get all sellers
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
      state.error = null;
    })
    .addCase("getAllSellersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Utilities
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
