import MOCK_DATA from "./mock_api.json";

export async function GET() {
  try {
    const res = { message: "Success", data: MOCK_DATA };
    return new Response(JSON.stringify(res));
  } catch (error) {
    console.error("Error fetching:", error);
    return new Response(null, { status: 500 });
  }
}
