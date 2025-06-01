import { createReducer } from "@reduxjs/toolkit";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  GET_ALL_PRODUCTS_SHOP_REQUEST,
  GET_ALL_PRODUCTS_SHOP_SUCCESS,
  GET_ALL_PRODUCTS_SHOP_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  CLEAR_PRODUCT_STATE,
} from "../productConstants";

const initialState = {
  isLoading: false,
  allProducts: [],
  products: [],
  product: null,
  error: null,
  success: false,
  message: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // Create product
    .addCase(PRODUCT_CREATE_REQUEST, (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
      state.message = null;
    })
    .addCase(PRODUCT_CREATE_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
      state.error = null;
    })
    .addCase(PRODUCT_CREATE_FAIL, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
      state.message = null;
    })

    // Get all products of shop
    .addCase(GET_ALL_PRODUCTS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase(GET_ALL_PRODUCTS_SHOP_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete product
    .addCase(DELETE_PRODUCT_REQUEST, (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
    })
    .addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase(DELETE_PRODUCT_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all products
    .addCase(GET_ALL_PRODUCTS_REQUEST, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(GET_ALL_PRODUCTS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.error = null;
    })
    .addCase(GET_ALL_PRODUCTS_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear product messages and errors
    .addCase(CLEAR_PRODUCT_STATE, (state) => {
      state.error = null;
      state.success = false;
      state.message = null;
      state.product = null;
    });
});
