import axios from "axios";
import { server } from "../../server";

// CREATE EVENT
export const createevent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const { data } = await axios.post(`${server}/event/create-event`, eventData);

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error?.response?.data?.message || error.message || "Something went wrong",
    });
  }
};

// GET ALL EVENTS (GLOBAL)
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events`);

    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFail",
      payload: error?.response?.data?.message || error.message,
    });
  }
};

// GET ALL EVENTS OF A SHOP
export const getAllEventsShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsShopRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events/${shopId}`);

    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFail",
      payload: error?.response?.data?.message || error.message,
    });
  }
};

// DELETE EVENT
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    const { data } = await axios.delete(`${server}/event/delete-shop-event/${eventId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error?.response?.data?.message || error.message,
    });
  }
};
