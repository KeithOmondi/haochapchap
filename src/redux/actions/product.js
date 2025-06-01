import axios from "axios";
import { server } from "../../server";
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

// Create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    // productData includes images and videos arrays of {public_id, url}

    const { data } = await axios.post(
      `${server}/product/create-product`,
      productData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });

    // Refresh all products list or your shop products as needed
    dispatch(getAllProducts());
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_SHOP_REQUEST });

    const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`${server}/product/delete-product/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });

    // Refresh product list if needed
    dispatch(getAllProducts());
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${server}/product/get-all-products`, {
      withCredentials: true,
    });

    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Clear product-related state
export const clearProductState = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_STATE });
};
