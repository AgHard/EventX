import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventsReducer from "./slices/eventsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    auth: authReducer,
  },
});
