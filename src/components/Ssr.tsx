import React from "react";

const Ssr = async () => {
  const response = await fetch(`http://localhost:4005/todos`, {
    cache: "no-cache",
  });
  const todos = await response.json();
  console.log("todos", todos);

  return (
    <>
      <header className="text-4xl font-extrabold text-center m-10">
        🐈 Todo List 🐾
      </header>
    </>
  );
};

export default Ssr;
