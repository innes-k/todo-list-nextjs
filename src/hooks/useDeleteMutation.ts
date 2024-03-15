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

  // x(삭제)버튼 클릭 핸들러
  const onDeleteHandler = (id: string) => {
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      return deleteTodo(id);
    }
    return;
  };

  return { deleteTodo, onDeleteHandler };
};
