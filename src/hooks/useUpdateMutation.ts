import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMutation = () => {
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

  return { updateTodo };
};
