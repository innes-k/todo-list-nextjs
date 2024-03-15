"use client";

import React, { useState } from "react";
import InputBox from "./InputBox";
import { useRouter } from "next/navigation";
import { useTodoQuery } from "@/hooks/useTodoQuery";
import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { useToggleMutation } from "@/hooks/useToggleMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";

const Csr = () => {
  // const [selectedId, setSelectedId] = useState("");
  // const [nextTitle, setNextTitle] = useState("");
  // const [nextContents, setNextContents] = useState("");

  const router = useRouter();

  // custom hook
  const { todos, isLoading, isError } = useTodoQuery();
  const { onDeleteHandler } = useDeleteMutation();
  const { toggleTodo } = useToggleMutation();
  const {
    selectedId,
    nextTitle,
    setNextTitle,
    nextContents,
    setNextContents,
    onEditHandler,
  } = useUpdateMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  // // 수정 버튼
  // const onEditHandler = (id: string, title: string, contents: string) => {
  //   if (selectedId === "") {
  //     setSelectedId(id);
  //     setNextTitle(title);
  //     setNextContents(contents);
  //   } else if (selectedId === id) {
  //     updateTodo({ id, nextTitle, nextContents });
  //     setSelectedId("");
  //   }
  // };

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
