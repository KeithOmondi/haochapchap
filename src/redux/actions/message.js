// src/redux/actions/messageActions.js
import axios from 'axios';
import {
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAIL,
} from '../productConstants';
import { server } from '../../server';

export const getAllMessages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_MESSAGES_REQUEST });

    const { data } = await axios.get(`${server}/message/all`, {
      withCredentials: true,  // <-- this sends cookies automatically
    });

    dispatch({
      type: GET_ALL_MESSAGES_SUCCESS,
      payload: data.messages,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

