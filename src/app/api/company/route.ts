export async function GET(request: Request) {
  const response = await fetch("http://localhost:4005/companyInfo", {
    cache: "no-cache",
  });
  const info = await response.json();

  if (!info) {
    return new Response("Company Information is not found", {
      status: 404,
    });
  }

  const { name, description, image } = info;

  return Response.json({
    companyInfo: {
      name,
      description,
      image,
    },
  });
}
