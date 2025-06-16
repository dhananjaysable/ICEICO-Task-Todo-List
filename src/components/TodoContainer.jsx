import React, { useState } from "react";
import { useTodo } from "../context/todos";

const TodoContainer = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const { allTodos, setTodos } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTodo.trim() !== "") {
      const formData = {
        text: currentTodo,
        completed: false,
      };
      setTodos([...allTodos, formData]);
      setCurrentTodo("");
    } else {
      alert("Write todo first!");
    }
  };

  const handleComplete = (idx) => {
    const updatedTodos = allTodos.map((todo, i) =>
      i === idx ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (idx) => {
    const isComfirm = confirm("Are you sure to delete todo?");
    if (isComfirm) {
      const updatedTodos = allTodos.filter((_, i) => i !== idx);
      setTodos(updatedTodos);
    }
    return;
  };

  const filteredTodos = allTodos.filter((todo) => {
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex justify-center min-h-screen px-4 py-8 ">
      <div className="w-full max-w-7xl bg-amber-50 p-4 sm:p-6 lg:p-8 rounded-md ring-2 ring-inset ring-orange-500">
        <div className="flex flex-col gap-4 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className="px-4 py-3 rounded-xl bg-amber-50 placeholder:font-semibold focus:outline-amber-200 ring-1 ring-yellow-300 focus-within:outline-2 text-sm sm:text-base"
              id="todoInput"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
              placeholder="Enter Todo here"
              name="todo"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="filter flex flex-wrap gap-2 sm:gap-5 text-base sm:text-xl bg-amber-50">
                <div
                  onClick={() => setFilter("all")}
                  className={`cursor-pointer hover:bg-amber-100 hover:text-red-700 px-3 py-2 sm:px-4 rounded-md transition-all ease-in-out text-sm sm:text-base ${
                    filter === "all"
                      ? "bg-red-100 text-red-700 font-bold"
                      : "text-red-500"
                  }`}
                >
                  All
                </div>
                <div
                  onClick={() => setFilter("pending")}
                  className={`cursor-pointer hover:bg-amber-100 hover:text-amber-700 px-3 py-2 sm:px-4 rounded-md transition-all ease-in-out text-sm sm:text-base ${
                    filter === "pending"
                      ? "bg-amber-100 text-amber-700 font-bold"
                      : "text-yellow-500"
                  }`}
                >
                  Pending
                </div>
                <div
                  onClick={() => setFilter("completed")}
                  className={`cursor-pointer hover:bg-amber-100 hover:text-emerald-800 px-3 py-2 sm:px-4 rounded-md transition-all ease-in-out text-sm sm:text-base ${
                    filter === "completed"
                      ? "bg-emerald-100 text-emerald-800 font-bold"
                      : "text-green-700"
                  }`}
                >
                  Completed
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-amber-500 text-amber-50 rounded-md cursor-pointer hover:bg-amber-600 font-bold text-sm sm:text-base"
              >
                Add Todo
              </button>
            </div>
          </form>

          <div className="todos border border-orange-400 h-96 overflow-auto p-2 sm:p-3 flex flex-col gap-3 mt-2 sm:mt-5">
            {[...filteredTodos].reverse().map((todo, index) => {
              const actualIndex = filteredTodos.length - 1 - index;

              return (
                <div
                  key={actualIndex}
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-3 sm:p-4 rounded shadow gap-3 sm:gap-2 ${
                    todo.completed ? "opacity-70 line-through" : ""
                  }`}
                >
                  <div className="desc text-sm sm:text-base flex-1">
                    <p className="break-words">{todo.text}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleComplete(actualIndex)}
                      className={`px-3 py-2 sm:px-4 font-semibold rounded-md text-xs sm:text-sm ${
                        todo.completed
                          ? "bg-green-400 text-white"
                          : "bg-gray-200 text-green-700"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Mark Complete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(actualIndex)}
                      className="px-3 py-2 sm:px-4 bg-orange-500 cursor-pointer font-semibold text-orange-50 rounded-md text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredTodos.length === 0 && (
              <div className="text-center text-gray-500 py-8 text-sm sm:text-base">
                {filter === "pending" && "No pending todos"}
                {filter === "completed" && "No completed todos"}
                {filter === "all" && "No todos yet. Add one above!"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
