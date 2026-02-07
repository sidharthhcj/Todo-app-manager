import { useEffect, useState } from "react";
import api from "../api";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await api.get("/todo/get");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input) return;
    await api.post("/todo/post", { task: input });
    setInput("");
    fetchTodos();
  };

  const toggleStatus = async (id, status) => {
    await api.patch(`/todo/update/${id}`, {
      status: status === "completed" ? "incomplete" : "completed",
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todo/delete/${id}`);
    fetchTodos();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-base-200 flex justify-center pt-10">
      <div className="w-[420px] bg-base-100 shadow-lg rounded-xl p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📝 My Todo</h2>
          <button className="btn btn-sm btn-error" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            className="input input-bordered w-full"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {["all", "completed", "incomplete"].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${
                filter === f ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <p className="text-center opacity-60">No tasks found</p>
        ) : (
          filteredTodos.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center bg-base-200 p-3 rounded mb-2"
            >
              <span
                className={`${
                  t.status === "completed" && "line-through opacity-60"
                }`}
              >
                {t.task}
              </span>

              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-success"
                  onClick={() => toggleStatus(t._id, t.status)}
                >
                  <MdCheckCircle />
                </button>

                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteTodo(t._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
