import axios from "axios";
import { server } from "../../server";

// Get all bookings
export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllBookingsRequest" });

    const { data } = await axios.get(`${server}/booking/all-bookings`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllBookingsSuccess",
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: "getAllBookingsFailed",
      payload: error.response?.data?.message || "Failed to fetch bookings",
    });
  }
};

// Create a new booking
export const createBooking = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createBookingRequest" });

    const { data } = await axios.post(
      `${server}/booking/create-booking`,
      formData,
      { withCredentials: true }
    );

    dispatch({
      type: "createBookingSuccess",
      payload: data.booking,
    });
  } catch (error) {
    dispatch({
      type: "createBookingFailed",
      payload: error.response?.data?.message || "Failed to create booking",
    });
  }
};

// Update booking status
export const updateBookingStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: "updateBookingStatusRequest" });

    const { data } = await axios.put(
      `${server}/booking/update-status/${id}`,
      { status },
      { withCredentials: true }
    );

    dispatch({
      type: "updateBookingStatusSuccess",
      payload: data.booking,
    });

    // Optionally refetch bookings or update local state
    dispatch(getAllBookings());
  } catch (error) {
    dispatch({
      type: "updateBookingStatusFailed",
      payload:
        error.response?.data?.message || "Failed to update booking status",
    });
  }
};

// Optional: Reset state
export const clearBookingState = () => ({
  type: "clearBookingState",
});
