import axios from "axios";
import { server } from "../../server";

export const createevent = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const { data } = await axios.post(
      `${server}/event/create-event`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    dispatch({ type: "eventCreateSuccess", payload: data.event });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsShopRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);

    dispatch({ type: "getAlleventsShopSuccess", payload: data.events });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteeventRequest" });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
      meta: { id },
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events`);

    dispatch({ type: "getAlleventsSuccess", payload: data.events });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};

export const clearSuccess = () => (dispatch) => {
  dispatch({ type: "clearSuccess" });
};
