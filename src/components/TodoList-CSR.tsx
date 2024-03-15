"use client";

import React from "react";
import { useTodoQuery } from "@/hooks/useTodoQuery";
import TodoItem from "./TodoItem";

const TodoListCSR = () => {
  // custom hook
  const { todos, isLoading, isError } = useTodoQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {todos?.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};

export default TodoListCSR;
