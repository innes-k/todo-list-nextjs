import { StateType, useUpdateStore } from "@/zustand/useUpdateStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateMutation = () => {
  // zustand에서 가져온 state와 update함수들
  // const { selectedId, nextTitle, nextContents } = useUpdateStore(
  //   (state: any): StateType => state.updateState
  // );
  // const updateSelectedId = useUpdateStore(
  //   (state: any) => state.updateSelectedId
  // );
  // const updateTitle = useUpdateStore((state: any) => state.updateTitle);
  // const updateContents = useUpdateStore((state: any) => state.updateContents);

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

  // // 수정 버튼
  // const onEditHandler = (id: string, title: string, contents: string) => {
  //   if (selectedId !== id) {
  //     updateSelectedId(id);
  //     updateTitle(title);
  //     updateContents(contents);

  //     console.log("selectedId", selectedId);
  //   } else if (selectedId === id) {
  //     updateTodo({ id, nextTitle, nextContents });
  //     updateSelectedId("");
  //   }
  // };

  // 수정 버튼
  const onEditHandler = (id: string, title: string, contents: string) => {
    if (selectedId !== id) {
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
    // updateTitle,
    nextContents,
    setNextContents,
    // updateContents,
    onEditHandler,
  };
};
