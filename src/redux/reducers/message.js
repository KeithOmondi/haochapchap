// src/redux/reducers/messageReducer.js
import {
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAIL,
} from '../productConstants';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES_REQUEST:
      return { ...state, isLoading: true };

    case GET_ALL_MESSAGES_SUCCESS:
      return { ...state, isLoading: false, messages: action.payload };

    case GET_ALL_MESSAGES_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
