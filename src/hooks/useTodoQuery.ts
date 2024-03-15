import { TodosQuery } from "@/types/todos-type";
import { useQuery } from "@tanstack/react-query";

export const useTodoQuery = () => {
  const {
    data: todos,
    isLoading,
    isError,
  }: TodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/todos`);
      const { todos } = await response.json();
      return todos;
    },
  });

  return { todos, isLoading, isError };
};
