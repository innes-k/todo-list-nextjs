"use client";

import { TodosQuery } from "@/types/todos-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import InputBox from "./InputBox";
import { useRouter } from "next/navigation";
import { useTodoQuery } from "@/hooks/useTodoQuery";

const Csr = () => {
  const [selectedId, setSelectedId] = useState("");
  const [nextTitle, setNextTitle] = useState("");
  const [nextContents, setNextContents] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  // custom hook
  const { todos, isLoading, isError } = useTodoQuery();

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

  const { mutate: toggleTodo } = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      await fetch(`http://localhost:3000/api/todos/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutate: updateTodo } = useMutation({
    mutationFn: async ({
      id,
      nextTitle,
      nextContents,
    }: {
      id: string;
      nextTitle: string;
      nextContents: string;
    }) => {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nextTitle, nextContents }),
      });
    },
    onSuccess: () => {
      setSelectedId("");
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

  // x 버튼
  const onDeleteHandler = (id: string) => {
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      return deleteTodo(id);
    }
    return;
  };

  // 수정 버튼
  const onEditHandler = (id: string, title: string, contents: string) => {
    if (selectedId === "") {
      setSelectedId(id);
      setNextTitle(title);
      setNextContents(contents);
    } else if (selectedId === id) {
      updateTodo({ id, nextTitle, nextContents });
    }
  };

  // 완료 버튼
  const onToggleHandler = (id: string, isDone: boolean) => {
    toggleTodo({ id, isDone });
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
                  {todo.isDone && (
                    <>
                      <p className="line-through">{todo.title}</p>
                      <li className="line-through">{todo.contents}</li>
                    </>
                  )}
                  {!todo.isDone && selectedId !== todo.id && (
                    <>
                      <p>{todo.title}</p>
                      <li>{todo.contents}</li>
                    </>
                  )}
                  {!todo.isDone && selectedId === todo.id && (
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        value={nextTitle}
                        onChange={(e) => {
                          setNextTitle(e.target.value);
                        }}
                        className="text-black"
                      />
                      <input
                        type="text"
                        value={nextContents}
                        onChange={(e) => {
                          setNextContents(e.target.value);
                        }}
                        className="text-black"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-10">
                  <button
                    onClick={() =>
                      onEditHandler(todo.id, todo.title, todo.contents)
                    }
                    className="text-sm border bg-white text-black p-1 rounded-md"
                  >
                    {selectedId === todo.id ? "수정완료" : "수정"}
                  </button>
                  <button
                    onClick={() => onToggleHandler(todo.id, todo.isDone)}
                    className="text-sm border bg-white text-black p-1 rounded-md"
                  >
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
