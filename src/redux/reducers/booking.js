import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
  success: false,
};

export const bookingReducer = createReducer(initialState, (builder) => {
  builder
    // Get all bookings
    .addCase("getAllBookingsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllBookingsSuccess", (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    })
    .addCase("getAllBookingsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Create booking
    .addCase("createBookingRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("createBookingSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.bookings.push(action.payload);
    })
    .addCase("createBookingFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })

    // Update booking status
    .addCase("updateBookingStatusRequest", (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    })
    .addCase("updateBookingStatusSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      // Update the booking in the bookings array
      const updatedBooking = action.payload;
      const index = state.bookings.findIndex(
        (booking) => booking._id === updatedBooking._id
      );
      if (index !== -1) {
        state.bookings[index] = updatedBooking;
      }
    })
    .addCase("updateBookingStatusFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Clear state
    .addCase("clearBookingState", (state) => {
      state.success = false;
      state.error = null;
    });
});
