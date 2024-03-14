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
