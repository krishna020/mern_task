import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.status = 'loading';
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
