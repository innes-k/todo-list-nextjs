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
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List 🐾
      </header>
      <div className="flex flex-col items-center gap-4 w-80 mx-auto border rounded-md p-4">
        <input type="text" />
        <input type="text" />
        <input type="submit" value="Submit" />
      </div>
      <div className="m-10 flex gap-14 justify-center mx-auto">
        {todos?.map((todo) => {
          return (
            <div key={todo.id} className="border rounded-md p-4">
              <section>
                <p>{todo.title}</p>
                <li>{todo.contents}</li>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Csr;
