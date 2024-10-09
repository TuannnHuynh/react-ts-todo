import { ToastContainer } from "react-toastify";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <TodoList />
      <ToastContainer autoClose={2500} />
    </>
  );
}

export default App;
