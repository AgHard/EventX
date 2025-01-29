import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLogged: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setIsLogged, setError } = authSlice.actions;
export default authSlice.reducer;
