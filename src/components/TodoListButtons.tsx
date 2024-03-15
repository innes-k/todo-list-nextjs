"use client";

import React from "react";

import { useToggleMutation } from "@/hooks/useToggleMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";

interface OwnProps {
  id: string;
  isDone: boolean;
  title: string;
  contents: string;
}

const TodoListButtons = ({ id, isDone, title, contents }: OwnProps) => {
  const { onToggleHandler } = useToggleMutation();
  const { selectedId, onEditHandler } = useUpdateMutation();

  return (
    <>
      <div className="flex justify-center gap-10">
        {!isDone && (
          <button
            onClick={() => onEditHandler(id, title, contents)}
            className="text-sm border bg-white text-black p-1 rounded-md"
          >
            {selectedId === id ? "수정완료" : "수정"}
          </button>
        )}

        <button
          onClick={() => onToggleHandler(id, isDone)}
          className="text-sm border bg-white text-black p-1 rounded-md"
        >
          {isDone ? "취소" : "완료"}
        </button>
      </div>
    </>
  );
};

export default TodoListButtons;
