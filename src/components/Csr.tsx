"use client";

import { Todos, TodosQuery } from "@/types/todos-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface Inputs {
  title: string;
  contents: string;
}

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

  const { mutate: updateTodo } = useMutation({
    mutationFn: async (newTodo: Inputs) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const todo = response.json();
      return todo;
    },
    onSuccess: () => {
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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const contents = formData.get("contents") as string;

    const newTodo = {
      title,
      contents,
    };

    updateTodo(newTodo);
  };

  return (
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List 🐾
      </header>
      <form
        className="flex flex-col items-center gap-4 w-80 mx-auto border rounded-md p-4"
        onSubmit={onSubmitHandler}
      >
        <input type="text" name="title" className="text-black" required />
        <input type="text" name="contents" className="text-black" required />
        <input type="submit" value="Submit" className="cursor-pointer" />
      </form>
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
