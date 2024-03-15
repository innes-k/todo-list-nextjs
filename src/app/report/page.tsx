import { Todos } from "@/types/todos-type";
import React from "react";

const ReportPage = async () => {
  const response = await fetch(`http://localhost:4005/todos`, {
    next: {
      revalidate: 10,
    },
  });
  const todos = await response.json();

  const workingTodos = todos.filter((todo: Todos) => {
    if (todo.isDone === false) return todo;
  });
  const doneTodos = todos.filter((todo: Todos) => {
    if (todo.isDone === true) return todo;
  });

  return (
    <div className="flex flex-col items-center m-10">
      <p className="text-4xl font-bold mb-4">⭐️ 진행중인 TodoList 현황 ⭐️</p>
      <p className="mb-10">(10초마다 데이터가 갱신됩니다)</p>
      <div className="flex flex-col gap-10 border rounded-2xl p-10">
        <p className="text-2xl">
          📝 현재 진행중인 할일 리스트 : {workingTodos.length}개
        </p>
        <p className="text-2xl">👍🏻 완료한 할일 리스트 : {doneTodos.length}개</p>
      </div>
    </div>
  );
};

export default ReportPage;
