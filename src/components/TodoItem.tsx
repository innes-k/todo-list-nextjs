import React, { useState } from "react";

import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { useToggleMutation } from "@/hooks/useToggleMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";

import type { Todos } from "@/types/todos-type";

interface OwnProp {
  todo: Todos;
}

const TodoItem = ({ todo }: OwnProp) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nextTitle, setNextTitle] = useState("");
  const [nextContents, setNextContents] = useState("");

  // custom hooks
  const { deleteTodo } = useDeleteMutation();
  const { toggleTodo } = useToggleMutation();
  const { updateTodo } = useUpdateMutation();

  // x(삭제)버튼 클릭 핸들러
  const onDeleteHandler = (id: string) => {
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      return deleteTodo(id);
    }
    return;
  };

  // 완료 버튼
  const onToggleHandler = (id: string, isDone: boolean) => {
    toggleTodo({ id, isDone });
  };

  // 수정 버튼
  const onEditHandler = (id: string, title: string, contents: string) => {
    if (!isEdit) {
      setIsEdit((prev) => !prev);
      setNextTitle(title);
      setNextContents(contents);
    } else if (isEdit) {
      updateTodo({ id, nextTitle, nextContents });
      setIsEdit((prev) => !prev);
    }
  };

  return (
    <>
      <div className="relative border rounded-md p-4 px-8">
        <button
          className="absolute top-1 right-2 h-3"
          onClick={() => onDeleteHandler(todo.id)}
        >
          x
        </button>
        <section className="flex flex-col gap-6">
          {isEdit ? (
            <>
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
              <div className="flex justify-center gap-10">
                <button
                  onClick={() =>
                    onEditHandler(todo.id, todo.title, todo.contents)
                  }
                  className="text-sm border bg-white text-black p-1 rounded-md"
                >
                  수정완료
                </button>
                <button
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                    setNextTitle(todo.title);
                    setNextContents(todo.contents);
                  }}
                  className="text-sm border bg-white text-black p-1 rounded-md"
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              {todo.isDone ? (
                <>
                  <div>
                    <p className="line-through">{todo.title}</p>
                    <li className="line-through">{todo.contents}</li>
                  </div>
                  <div className="flex justify-center gap-10">
                    <button
                      onClick={() => onToggleHandler(todo.id, todo.isDone)}
                      className="text-sm border bg-white text-black p-1 rounded-md"
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p>{todo.title}</p>
                    <li>{todo.contents}</li>
                  </div>
                  <div className="flex justify-center gap-10">
                    <button
                      onClick={() =>
                        onEditHandler(todo.id, todo.title, todo.contents)
                      }
                      className="text-sm border bg-white text-black p-1 rounded-md"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onToggleHandler(todo.id, todo.isDone)}
                      className="text-sm border bg-white text-black p-1 rounded-md"
                    >
                      완료
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default TodoItem;
