"use client";

import { Todos, TodosQuery } from "@/types/todos-type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Csr = () => {
  const {
    data: todos,
    isLoading,
    isError,
  }: TodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/todos`);
      const { todos } = await response.json();
      console.log("todos", todos);
      return todos;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="m-10 flex gap-14 justify-center">
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <section>
              <p>{todo.title}</p>
              <li>{todo.contents}</li>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Csr;
