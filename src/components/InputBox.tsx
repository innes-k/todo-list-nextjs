import { Inputs } from "@/types/todos-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const InputBox = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation({
    mutationFn: async (newTodo: Inputs) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const todo = response.json();
      return todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const contents = formData.get("contents") as string;

    const newTodo = {
      title,
      contents,
    };

    updateTodo(newTodo);
    e.currentTarget.reset();
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-4 w-80 mx-auto border rounded-md p-4"
        onSubmit={onSubmitHandler}
      >
        <input type="text" name="title" className="text-black" required />
        <input type="text" name="contents" className="text-black" required />
        <input type="submit" value="Submit" className="cursor-pointer" />
      </form>
    </>
  );
};

export default InputBox;
