"use client";

import { TodosQuery } from "@/types/todos-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import InputBox from "./InputBox";
import { useRouter } from "next/navigation";

const Csr = () => {
  const router = useRouter();
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
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
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

  const onDeleteHandler = (id: string) => {
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      return deleteTodo(id);
    }
    return;
  };

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
        {todos?.map((todo) => {
          return (
            <div key={todo.id} className="relative border rounded-md p-4 px-8">
              <button
                className="absolute top-1 right-2 h-3"
                onClick={() => onDeleteHandler(todo.id)}
              >
                x
              </button>
              <section className="flex flex-col gap-6">
                <div>
                  <p>{todo.title}</p>
                  <li>{todo.contents}</li>
                </div>
                <div className="flex justify-center gap-10">
                  <button className="text-sm border bg-white text-black p-1 rounded-md">
                    수정
                  </button>
                  <button className="text-sm border bg-white text-black p-1 rounded-md">
                    완료
                  </button>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Csr;
