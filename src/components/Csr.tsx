"use client";

import { TodosQuery } from "@/types/todos-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import InputBox from "./InputBox";

const Csr = () => {
  const queryClient = useQueryClient();
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

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:3000/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    },
    onSuccess: () => {
      console.log("hi");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const onDeleteHandler = (id: string) => {
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      return deleteTodo(id);
    }
    return;
  };

  return (
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List 🐾
      </header>
      <InputBox />
      <div className="m-10 flex gap-14 justify-center mx-auto">
        {todos?.map((todo) => {
          return (
            <div key={todo.id} className="relative border rounded-md p-4">
              <button
                className="absolute top-1 right-2 h-3"
                onClick={() => onDeleteHandler(todo.id)}
              >
                x
              </button>
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
