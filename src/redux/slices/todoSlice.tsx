import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}

// Interface for the slice state
interface ITodoState {
  todoList: ITodo[];
  status: string;
  edit: boolean;
}

const initialState: ITodoState = {
  todoList: [],
  status: "idle",
  edit: false,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get("https://dummyjson.com/todos");
  return res.data.todos;
});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axios.delete(`https://dummyjson.com/todos/${id}`);
    return id;
  },
);
export const updateStatusTodo = createAsyncThunk(
  "todos/updateStatusTodo",
  async (id: number) => {
    await axios.put(`https://dummyjson.com/todos/${id}`);
    return id;
  },
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo: Omit<ITodo, "id">) => {
    const res = await axios.post("https://dummyjson.com/todos/add", {
      todo: newTodo.todo,
      completed: newTodo.completed,
      userId: 1,
    });
    return res.data; // Trả về todo vừa được thêm
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    editTodo: (state) => {
      state.edit = true;
    },
    updateTodo: (state, action) => {
      state.edit = false;
      state.todoList = state.todoList.map((val) => {
        return val.id === action.payload.id
          ? { ...val, todo: action.payload.value }
          : val;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const index = state.todoList.findIndex(
          (todo) => todo.id === action.payload,
        );
        state.todoList.splice(index, 1);
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todoList.unshift(action.payload);
      })
      .addCase(updateStatusTodo.fulfilled, (state, action) => {
        state.todoList = state.todoList.map((val) => {
          return val.id === action.payload
            ? { ...val, completed: !val.completed }
            : val;
        });
      });
  },
});

export const { editTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
