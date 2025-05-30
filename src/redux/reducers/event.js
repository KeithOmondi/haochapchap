import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allEvents: [],
  event: null,
  error: null,
  success: false,
  message: "",
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // Create Event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.message = "";
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.event = action.payload;
      state.message = "Event created successfully!";
      state.error = null;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
      state.message = "Failed to create event.";
    })

    // Get All Events
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = "";
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
    })
    .addCase("getAlleventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = "Failed to fetch events.";
    })

    // Get All Events of Shop
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = "";
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
    })
    .addCase("getAlleventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = "Failed to fetch events for shop.";
    })

    // Delete Event
    .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = "";
    })
    .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;

      // Optional: Remove the deleted event from allEvents
      state.allEvents = state.allEvents.filter(
        (event) => event._id !== action.meta?.id
      );
    })

    .addCase("deleteeventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = "Failed to delete event.";
    })

    // Clear Errors and Success
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.message = "";
    })
    .addCase("clearSuccess", (state) => {
      state.success = false;
      state.message = "";
    });
});
