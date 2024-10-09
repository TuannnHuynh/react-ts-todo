import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import {
  fetchTodos,
  deleteTodo,
  addNewTodo,
  updateStatusTodo,
  editTodo,
  updateTodo,
  ITodo,
} from "../redux/slices/todoSlice";
import { toast } from "react-toastify";
import Todo from "./Todo";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todoList, status, edit } = useSelector(
    (state: RootState) => state.todos,
  );
  const [idEdit, setIdEdit] = useState<number>();
  const [search, setSearch] = useState<string | undefined>();
  const [selected, setSelected] = useState<string>("default");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ): void => {
    e.preventDefault();
    toast.promise(dispatch(deleteTodo(id)), {
      pending: "Promise is pending",
      success: "Deleted todo successfully",
      error: "Promise rejected",
    });
  };
  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    val: ITodo,
  ): void => {
    e.preventDefault();
    if (inputRef.current) {
      dispatch(editTodo());
      inputRef.current.value = val.todo;
      setIdEdit(val.id);
      inputRef.current.focus();
    }
  };
  const handleUpdateStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ): void => {
    e.preventDefault();

    toast.promise(dispatch(updateStatusTodo(id)), {
      pending: "Promise is pending",
      success: "Updated status successfully",
      error: "Promise rejected",
    });
  };
  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    if (!edit) {
      toast.promise(
        dispatch(
          addNewTodo({ todo: `${inputRef.current?.value}`, completed: false }),
        ),
        {
          pending: "Promise is pending",
          success: "Added todo successfully",
          error: "Promise rejected",
        },
      );
    } else {
      if (inputRef.current) {
        dispatch(updateTodo({ value: inputRef.current.value, id: idEdit }));
      }
    }
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  console.log(search);

  return (
    <div className="todos mx-auto mt-6 w-11/12 font-roboto-slab sm:mt-12 sm:w-4/6 md:w-3/5 lg:w-6/12 xl:mt-20 xl:w-5/12">
      <form
        className="w-full rounded-md bg-gray-200 p-4 sm:px-6 lg:px-10 lg:py-8"
        action=""
      >
        <h2 className="font mb-4 text-center text-2xl font-bold text-slate-800 sm:mb-6 sm:text-3xl">
          TODO LIST
        </h2>
        <div className="input-group mb-[10px] flex justify-between sm:mb-4">
          <input
            ref={inputRef}
            className="w-10/12 rounded-s border-none px-4 py-1 outline-none sm:py-[5px]"
            type="text"
            placeholder="Enter your task..."
          />
          <button
            onClick={handleAdd}
            className="w-2/12 rounded-e bg-blue-600 text-white duration-300 ease-in hover:bg-blue-500"
          >
            <i
              className={
                edit ? "fa-solid fa-screwdriver-wrench" : "fa-solid fa-plus"
              }
            ></i>
          </button>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="options mb-[10px] text-lg sm:mb-0 sm:w-1/3 sm:text-base">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="h-7 w-full cursor-pointer rounded-sm ps-1 text-base font-normal outline-none sm:h-6"
            >
              <option value="default">Default</option>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="search flex sm:w-5/12">
            <input
              className="w-10/12 rounded-s px-[10px] py-[2px] outline-none"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <button className="w-2/12 rounded-e bg-blue-600 text-white duration-300 ease-in hover:bg-blue-500">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </button>
          </div>
        </div>
        <span className="mt-3 block border-b-2 border-slate-700 pb-1 ps-[3px] text-sm font-medium text-slate-800">
          All Your Notes Here
        </span>
        <div
          className={`todo-list mt-4 pr-1 sm:pr-[6px] ${todoList.length > 5 ? "todo-list h-[250px] overflow-y-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-500 scrollbar-track-rounded-full scrollbar-thumb-rounded-full" : ""}`}
        >
          <ul>
            {status === "loading" ? (
              <p>Loading...</p>
            ) : !search ? (
              todoList
                .filter((val) => {
                  const selectValue = selected;
                  if (selectValue === "default") return true;
                  if (selectValue === "completed") return val.completed;
                  if (selectValue === "incomplete") return !val.completed;
                  return false;
                })
                .map((val) => {
                  return (
                    <Todo
                      key={`todo-${val.id}`}
                      val={val}
                      handleDelete={handleDelete}
                      handleUpdateStatus={handleUpdateStatus}
                      handleEdit={handleEdit}
                    />
                  );
                })
            ) : todoList.filter((key) =>
                key.todo.toLowerCase().includes(search.toLowerCase()),
              ).length > 0 ? (
              todoList
                .filter((value) =>
                  value.todo.toLowerCase().includes(search.toLowerCase()),
                )
                .filter((val) => {
                  const selectValue = selected;
                  if (selectValue === "default") return true;
                  if (selectValue === "completed") return val.completed;
                  if (selectValue === "incomplete") return !val.completed;
                  return false;
                }).length > 0 ? (
                todoList
                  .filter((value) =>
                    value.todo.toLowerCase().includes(search.toLowerCase()),
                  )
                  .filter((val) => {
                    const selectValue = selected;
                    if (selectValue === "default") return true;
                    if (selectValue === "completed") return val.completed;
                    if (selectValue === "incomplete") return !val.completed;
                    return false;
                  })
                  .map((val) => {
                    return (
                      <Todo
                        key={`todo-${val.id}`}
                        val={val}
                        handleDelete={handleDelete}
                        handleUpdateStatus={handleUpdateStatus}
                        handleEdit={handleEdit}
                      />
                    );
                  })
              ) : (
                <h3 className="text-xl font-medium">
                  No result{" "}
                  <i className="fa-solid fa-triangle-exclamation text-2xl text-yellow-400"></i>
                </h3>
              )
            ) : (
              <h3 className="text-xl font-medium">
                No result{" "}
                <i className="fa-solid fa-triangle-exclamation text-2xl text-yellow-400"></i>
              </h3>
            )}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default TodoList;
