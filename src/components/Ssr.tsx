import Link from "next/link";
import React from "react";
import TodoListSSR from "./TodoList-SSR";

const Ssr = () => {
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
      <TodoListSSR />
    </>
  );
};

export default Ssr;
