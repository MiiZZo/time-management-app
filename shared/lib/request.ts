type RequestMethod = "GET" | "POST" | "UPDATE" | "DELETE" | "PUT";

export const request = async (
  url: string,
  method: RequestMethod = "GET",
  body: any | null = null,
): Promise<any> => {
  const headers = new Headers();
  if (body !== null) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    headers,
    body: body ? JSON.stringify(body) : null,
    method
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};
