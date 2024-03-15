import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

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

  return { deleteTodo };
};
