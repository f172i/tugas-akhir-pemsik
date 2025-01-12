import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/studentSlice.jsx";
import authReducer from "../slice/authSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
  },
});
