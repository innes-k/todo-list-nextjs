"use client";

import React from "react";
import InputBox from "./InputBox";
import { useRouter } from "next/navigation";
import TodoListCSR from "./TodoList-CSR";

const Csr = () => {
  const router = useRouter();

  const onReportHandler = () => {
    router.push("/report");
  };

  return (
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List - CSR 🐾
      </header>
      <button
        onClick={onReportHandler}
        className="bg-white text-black rounded-md absolute top-20 right-4 px-2"
      >
        할일 정보 통계 보러가기
      </button>
      <InputBox />
      <div className="m-10 flex flex-wrap gap-14 justify-center mx-auto">
        <TodoListCSR />
      </div>
    </>
  );
};

export default Csr;
