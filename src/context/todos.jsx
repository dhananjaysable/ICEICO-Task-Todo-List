import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [allTodos, setTodos] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    } else {
      setTodos([]);
    }
  }, [isCreated]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);

  const value = {
    allTodos,
    setTodos,
    isCreated,
    setIsCreated,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
