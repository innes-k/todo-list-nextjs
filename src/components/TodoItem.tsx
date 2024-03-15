import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { useToggleMutation } from "@/hooks/useToggleMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";
import { Todos } from "@/types/todos-type";
import React, { useState } from "react";

interface OwnProp {
  todo: Todos;
}

const TodoItem = ({ todo }: OwnProp) => {
  const [isEdit, setIsEdit] = useState(false);

  // custom hook
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

  // 완료 버튼
  const onToggleHandler = (id: string, isDone: boolean) => {
    toggleTodo({ id, isDone });
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
                <button className="text-sm border bg-white text-black p-1 rounded-md">
                  수정완료
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
                    <button className="text-sm border bg-white text-black p-1 rounded-md">
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

        {/* <div>
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
            {!todo.isDone && (
              <button
                onClick={() =>
                  onEditHandler(todo.id, todo.title, todo.contents)
                }
                className="text-sm border bg-white text-black p-1 rounded-md"
              >
                {selectedId === todo.id ? "수정완료" : "수정"}
              </button>
            )}

            <button
              onClick={() => onToggleHandler(todo.id, todo.isDone)}
              className="text-sm border bg-white text-black p-1 rounded-md"
            >
              {todo.isDone ? "취소" : "완료"}
            </button>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default TodoItem;
