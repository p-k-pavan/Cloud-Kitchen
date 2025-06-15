import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
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
    },
     signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state, action) => {
      state.currentAdmin  = null;
      state.loading = false;
      state.error = null;
    },
    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInstart,
  signInSuccess,
  signInFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure
  
} = adminSlice.actions;

export default adminSlice.reducer;