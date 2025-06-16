import { useState } from "react";
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
    const isConfirm = confirm("Are you sure to delete todo?");
    if (isConfirm) {
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
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-none sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-orange-50 rounded-md shadow-md overflow-hidden">
        <div className="w-full min-h-full  p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="w-full flex flex-col gap-4">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <input
                type="text"
                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-xl bg-amber-50 placeholder:font-semibold focus:outline-amber-200 ring-1 ring-yellow-300 focus-within:outline-2 text-sm sm:text-base md:text-lg"
                id="todoInput"
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
                placeholder="Enter Todo here"
                name="todo"
                autoComplete="off"
              />
              <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="w-full sm:w-auto flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
                  <div
                    onClick={() => setFilter("all")}
                    className={`flex-1 sm:flex-none text-center cursor-pointer hover:bg-amber-100 hover:text-red-700 px-3 py-2 sm:px-4 md:px-5 rounded-md transition-all ease-in-out text-sm sm:text-base md:text-lg ${
                      filter === "all"
                        ? "bg-red-100 text-red-700 font-bold"
                        : "text-red-500"
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label="Show all todos"
                  >
                    All
                  </div>
                  <div
                    onClick={() => setFilter("pending")}
                    className={`flex-1 sm:flex-none text-center cursor-pointer hover:bg-amber-100 hover:text-amber-700 px-3 py-2 sm:px-4 md:px-5 rounded-md transition-all ease-in-out text-sm sm:text-base md:text-lg ${
                      filter === "pending"
                        ? "bg-amber-100 text-amber-700 font-bold"
                        : "text-yellow-500"
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label="Show pending todos"
                  >
                    Pending
                  </div>
                  <div
                    onClick={() => setFilter("completed")}
                    className={`flex-1 sm:flex-none text-center cursor-pointer hover:bg-amber-100 hover:text-emerald-800 px-3 py-2 sm:px-4 md:px-5 rounded-md transition-all ease-in-out text-sm sm:text-base md:text-lg ${
                      filter === "completed"
                        ? "bg-emerald-100 text-emerald-800 font-bold"
                        : "text-green-700"
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label="Show completed todos"
                  >
                    Completed
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 sm:px-5 sm:py-2 md:px-6 md:py-3 bg-amber-500 text-amber-50 rounded-md cursor-pointer hover:bg-amber-600 active:bg-amber-700 font-bold text-sm sm:text-base md:text-lg transition-colors duration-200"
                  aria-label="Add todo"
                >
                  Add Todo
                </button>
              </div>
            </form>
            <div className="w-full min-h-[60vh] sm:min-h-[55vh] md:min-h-[60vh] max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] overflow-y-auto border border-amber-200 rounded-lg bg-white/50">
              <div className="w-full p-2 sm:p-3 md:p-4 flex flex-col gap-3">
                {[...filteredTodos].reverse().map((todo) => {
                  const originalIdx = allTodos.findIndex((t) => t === todo);
                  return (
                    <div
                      key={originalIdx}
                      className={`w-full flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start sm:gap-4 bg-amber-50 p-3 sm:p-4 md:p-5 rounded-lg shadow-sm border border-amber-100 transition-all duration-200 ${
                        todo.completed
                          ? "opacity-70 line-through bg-gray-50"
                          : ""
                      }`}
                    >
                      <div className="w-full sm:flex-1 min-w-0">
                        <p className="text-sm sm:text-base md:text-lg break-words leading-relaxed">
                          {todo.text}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleComplete(originalIdx)}
                          className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 font-semibold rounded-md transition-all duration-200 text-xs sm:text-sm md:text-base ${
                            todo.completed
                              ? "bg-green-400 hover:bg-green-500 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-green-700"
                          }`}
                          aria-label={
                            todo.completed
                              ? "Mark as pending"
                              : "Mark as completed"
                          }
                        >
                          {todo.completed ? "Completed" : "Mark Complete"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(originalIdx)}
                          className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 cursor-pointer font-semibold text-orange-50 rounded-md transition-all duration-200 text-xs sm:text-sm md:text-base"
                          aria-label="Delete todo"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredTodos.length === 0 && (
                  <div className="w-full text-center text-gray-500 py-12 sm:py-16 md:py-20">
                    <div className="text-lg sm:text-xl md:text-2xl mb-2">
                      {filter === "pending" && "📋"}
                      {filter === "completed" && "✅"}
                      {filter === "all" && "📝"}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg">
                      {filter === "pending" && "No pending todos"}
                      {filter === "completed" && "No completed todos"}
                      {filter === "all" && "No todos yet. Add one above!"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
