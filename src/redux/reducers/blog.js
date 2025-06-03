import {
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
} from "../productConstants";

const initialState = {
  blogs: [],
  isLoading: false,
  error: null,
  newBlog: null,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS_REQUEST:
    case CREATE_BLOG_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_ALL_BLOGS_SUCCESS:
      return { ...state, isLoading: false, blogs: action.payload };

    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: [action.payload, ...state.blogs],
        newBlog: action.payload,
      };

    case GET_ALL_BLOGS_FAIL:
    case CREATE_BLOG_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
