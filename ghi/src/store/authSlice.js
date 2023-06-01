import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      console.log("Payload received by LoginSuccess: ", action.payload);
      state.status = 'succeeded';
      state.token = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.status = 'idle';
      state.token = null;
      state.error = null;
    },
  }
});

export const { loginRequest, loginSuccess, loginFailed, logout } = authSlice.actions;
