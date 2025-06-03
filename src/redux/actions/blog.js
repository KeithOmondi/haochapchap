import axios from "axios";
import {
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
} from "../productConstants";
import { server } from "../../server";

// Get all blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BLOGS_REQUEST });

    const { data } = await axios.get(`${server}/blog/get-all-blogs`);
    dispatch({ type: GET_ALL_BLOGS_SUCCESS, payload: data.blogs });
  } catch (error) {
    dispatch({
      type: GET_ALL_BLOGS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create a new blog
export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(`${server}/blog/create-blog`, blogData, config);
    dispatch({ type: CREATE_BLOG_SUCCESS, payload: data.blog });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
