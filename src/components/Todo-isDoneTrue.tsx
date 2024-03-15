import React from "react";

interface OwnProps {
  isDone: boolean;
  title: string;
  contents: string;
}

const TodoIsDoneTrue = ({ isDone, title, contents }: OwnProps) => {
  return (
    <>
      {isDone && (
        <>
          <p className="line-through">{title}</p>
          <li className="line-through">{contents}</li>
        </>
      )}
    </>
  );
};

export default TodoIsDoneTrue;
