import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateMutation = () => {
  const [selectedId, setSelectedId] = useState("");
  const [nextTitle, setNextTitle] = useState("");
  const [nextContents, setNextContents] = useState("");

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  // 수정 버튼
  const onEditHandler = (id: string, title: string, contents: string) => {
    if (selectedId === "") {
      setSelectedId(id);
      setNextTitle(title);
      setNextContents(contents);
    } else if (selectedId === id) {
      updateTodo({ id, nextTitle, nextContents });
      setSelectedId("");
    }
  };

  return {
    selectedId,
    nextTitle,
    setNextTitle,
    nextContents,
    setNextContents,
    onEditHandler,
  };
};
