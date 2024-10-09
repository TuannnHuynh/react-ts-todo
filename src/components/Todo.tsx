import { ITodo } from "../redux/slices/todoSlice";

type dataTodo = {
  val: ITodo;
  handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ): void;
  handleUpdateStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ): void;
  handleEdit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    val: ITodo,
  ): void;
};

const Todo = ({
  val,
  handleDelete,
  handleUpdateStatus,
  handleEdit,
}: dataTodo) => {
  return (
    <li
      className={`mb-4 flex items-center justify-between text-lg text-slate-800 ${val.completed ? "line-through" : ""}`}
    >
      <div className="w-9/12">
        <span className="mr-1 inline-block font-semibold">{val.id}.</span>
        {val.todo}
      </div>
      <div className="groups-btn flex">
        <button
          onClick={(e) => handleEdit(e, val)}
          className="rounded-md bg-blue-600 px-[6px] leading-3 text-white duration-300 ease-in hover:bg-blue-500"
        >
          <i className="fa-regular fa-pen-to-square text-sm leading-3"></i>
        </button>
        <button
          onClick={(e) => handleDelete(e, val.id)}
          className="mx-1 rounded-md bg-red-600 px-[6px] text-white duration-300 ease-in hover:bg-red-500"
        >
          <i className="fa-solid fa-trash text-sm leading-3"></i>
        </button>
        <button
          onClick={(e) => handleUpdateStatus(e, val.id)}
          className={`rounded-md leading-3 ${val.completed ? "bg-yellow-500 px-[6.8px] hover:bg-yellow-400" : "bg-green-500 px-[6px] hover:bg-green-400"} text-white duration-300 ease-in`}
        >
          <i
            className={`text-sm ${val.completed ? "fa-solid fa-xmark" : "fa-solid fa-check"} leading-3`}
          ></i>
        </button>
      </div>
    </li>
  );
};

export default Todo;
