import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    signInstart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  signInstart,
  signInSuccess,
  signInFailure,
  
} = adminSlice.actions;

export default adminSlice.reducer;