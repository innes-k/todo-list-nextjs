export async function GET(request: Request) {
  const response = await fetch("http://localhost:4005/todos", {
    cache: "no-cache",
  });
  const todos = await response.json();

  if (!todos) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    todos,
  });
}
