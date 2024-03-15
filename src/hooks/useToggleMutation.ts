import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleMutation = () => {
  const queryClient = useQueryClient();

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

  // 완료 버튼
  const onToggleHandler = (id: string, isDone: boolean) => {
    toggleTodo({ id, isDone });
  };

  return { onToggleHandler };
};
