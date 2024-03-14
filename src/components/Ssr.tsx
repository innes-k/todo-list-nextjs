import { Todos } from "@/types/todos-type";
import Link from "next/link";
import React from "react";

const Ssr = async () => {
  const response = await fetch(`http://localhost:4005/todos`, {
    cache: "no-cache",
  });
  const todos = await response.json();
  console.log("todos", todos);

  return (
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List - SSR 🐾
      </header>
      <Link
        href="/report"
        className="bg-white text-black rounded-md absolute top-20 right-4 px-2"
      >
        할일 정보 통계 보러가기
      </Link>
      <div className="m-10 flex flex-wrap gap-14 justify-center mx-auto">
        {todos?.map((todo: Todos) => {
          return (
            <div key={todo.id} className="relative border rounded-md p-4 px-8">
              <section className="flex flex-col gap-6">
                <div>
                  <p>{todo.title}</p>
                  <li>{todo.contents}</li>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ssr;
