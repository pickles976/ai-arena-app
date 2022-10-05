import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/code/codeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    code: goalReducer,
  },
});
