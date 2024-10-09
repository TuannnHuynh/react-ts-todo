import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
