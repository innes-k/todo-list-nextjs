import React from "react";
import { Todos } from "@/types/todos-type";

const TodoListSSR = async () => {
  const response = await fetch(`http://localhost:4005/todos`, {
    cache: "no-cache",
  });
  const todos = await response.json();

  return (
    <>
      <div className="m-10 flex flex-wrap gap-14 justify-center mx-auto">
        {todos?.map((todo: Todos) => {
          return (
            <div key={todo.id} className="relative border rounded-md p-4 px-8">
              <section className="flex flex-col gap-6">
                <div>
                  {todo.isDone ? (
                    <>
                      <p className="line-through">{todo.title}</p>
                      <li className="line-through">{todo.contents}</li>
                    </>
                  ) : (
                    <>
                      <p>{todo.title}</p>
                      <li>{todo.contents}</li>
                    </>
                  )}
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoListSSR;
