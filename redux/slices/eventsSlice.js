import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setEvents, setError, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
