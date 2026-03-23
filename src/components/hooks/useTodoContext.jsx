import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodosContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useTodosContext must be used inside a TodoContextProvider");
  }

  return context;
};