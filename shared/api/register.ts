const API_URL = process.env.API_URL;

export const register = (data: any) => ({
  url: `${API_URL}/auth/register`,
  method: "POST",
  body: data
});
