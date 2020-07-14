type RequestMethod = "GET" | "POST" | "UPDATE" | "DELETE" | "PUT";
type ResponseData = {
  data: any | null;
  error: string | null;
}

export const request = async (
  url: string,
  method: RequestMethod = "GET",
  body: any | null = null
): Promise<any | never> => {
  const data: ResponseData = {
    data: null,
    error: 'error'
  }
  try {
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
      const error = await response.json();
      data.error = error.message;

      return data;
    }

    data.data = await response.json();

    return data;
  } catch {

  }
};
