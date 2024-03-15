export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await fetch(`http://localhost:4005/todos/${id}`, {
    method: "DELETE",
  });
  return Response.json({
    id,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { nextTitle, nextContents } = await request.json();

  const response = await fetch(`http://localhost:4005/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: nextTitle, contents: nextContents }),
  });

  return Response.json({
    id,
  });
}
